import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

import * as THREE from 'three'

const rgb = function(r, g, b) {
  return new THREE.Vector3(r, g, b)
}

const randomInteger = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const noise = `
#define NUM_OCTAVES 5
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float rand(float n){return fract(sin(n) * 43758.5453123);}
  float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }
  float noise(float p){
  float fl = floor(p);
  float fc = fract(p);
  return mix(rand(fl), rand(fl + 1.0), fc);
  }
  float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
  return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
  }
  float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
  0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
  -0.577350269189626,  // -1.0 + 2.0 * C.x
  0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
  }
  const mat2 m2 = mat2(0.8,-0.6,0.6,0.8);
  #define NB_OCTAVES 8
  #define LACUNARITY 10.0
  #define GAIN 0.5
  float fbm(in vec2 p) {
  float total = 0.0,
  frequency = 1.0,
  amplitude = 1.0;
  for (int i = 0; i < NB_OCTAVES; i++) {
  total += snoise(p * frequency) * amplitude;
  frequency *= LACUNARITY;
  amplitude *= GAIN;
  }
  return total;
  }`

const vertex = `uniform float u_time;
  uniform float u_height;
  uniform vec2 u_rand;
  float xDistortion;
  float yDistortion;
  varying float vDistortion;
  varying vec2 vUv;
  void main() {
  vUv = uv;
  vDistortion = snoise(vUv.xx * 3. - vec2(u_time / u_rand.x, u_time / u_rand.x) + cos(vUv.yy) * u_rand.y) * u_height;
  xDistortion = snoise(vUv.xx * 1.) * u_height * u_rand.x / 10.;
  vec3 pos = position;
  pos.z += (vDistortion * 55.);
  pos.x += (xDistortion * 55.);
  pos.y += (sin(vUv.y) * 55.);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }`

const fragment = `vec3 rgb(float r, float g, float b) {
  return vec3(r / 255., g / 255., b / 255.);
  }
  vec3 rgb(float c) {
  return vec3(c / 255., c / 255., c / 255.);
  }
  uniform vec3 u_lowColor;
  uniform vec3 u_highColor;
  uniform float u_time;
  varying vec2 vUv;
  varying float vDistortion;
  varying float xDistortion;
  void main() {
  vec3 highColor = rgb(u_highColor.r, u_highColor.g, u_highColor.b);
  vec3 colorMap = rgb(u_lowColor.r, u_lowColor.g, u_lowColor.b);
  colorMap = mix(colorMap, highColor, vDistortion);
  gl_FragColor = vec4(colorMap, 1.);
  }`

const config = {
  individualItem: '.cap__box', // class of individual item
  carouselWidth: document.querySelector('.cap__box') ? document.querySelector('.cap__box').clientWidth : 0, // in px
  carouselId: '#cap__carousel', // carousel selector
  carouselHolderId: '#cap__area', // carousel should be <div id="carouselId"><div id="carouselHolderId">{items}</div></div>
  colors: [
    // Define colors for each item. If more items than colors, then first color will be used as default
    // Format { low: rgb(), high: rgb() for each color }
    { low: rgb(181, 224, 238), high: rgb(166, 217, 234) },
    { low: rgb(47, 149, 181), high: rgb(33, 131, 166) },
    { low: rgb(15, 66, 81), high: rgb(11, 57, 72) },
  ]
}

// Async function for generating webGL waves
async function createWave (selector, colors) {
  if(document.querySelectorAll(selector) !== null && document.querySelectorAll(selector).length > 0) {
    let i = 0

    document.querySelectorAll(selector).forEach(function(item) {
      // Create a renderer

      let animationPause = false

      const newCanvas = document.createElement('canvas')
      newCanvas.id = `canvas-${i}`
      item.appendChild(newCanvas)

      const renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true,
        alpha: false,
        canvas: document.getElementById(`canvas-${i}`)
      })

      // Get el width and height
      let elWidth
      let elHeight

      if (window.innerWidth < 768) {
        elWidth = 343
        elHeight = 336
      } else {
        elWidth = 686
        elHeight = 672
      }

      // Set sizes and set scene/camera
      renderer.setSize( elWidth, elHeight );

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera( 75, elWidth / elHeight, 0.1, 1000 )

      // Check on colors to use
      let high = colors[0].high
      let low = colors[0].low
      if(typeof colors[i] !== "undefined") {
        high = colors[i].high
        low = colors[i].low
        ++i
      }

      // Create a plane, and pass that through to our shaders
      let geometry = new THREE.PlaneGeometry(600, 600, 100, 100)
      let material = new THREE.ShaderMaterial({
        uniforms: {
          u_lowColor: {type: 'v3', value: low },
          u_highColor: {type: 'v3', value: high },
          u_time: {type: 'f', value: 0},
          u_height: {type: 'f', value: 1},
          u_rand: {type: 'f', value: new THREE.Vector2(randomInteger(6, 10), randomInteger(8, 10)) }
        },
        fragmentShader: noise + fragment,
        vertexShader: noise + vertex,
      })

      // Create the mesh and position appropriately
      let mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(0, 0, -300)
      mesh.material.needsUpdate = true
      scene.add(mesh)

      // On hover effects for each item
      if (window.innerWidth >= 1440) {
        let enterTimer, exitTimer
        item.addEventListener('mouseenter', function (e) {
          if (typeof exitTimer !== "undefined") {
            clearTimeout(exitTimer)
          }
          enterTimer = setInterval(function () {
            if (mesh.material.uniforms.u_height.value >= 0.5) {
              mesh.material.uniforms.u_height.value -= 0.05
            } else {
              clearTimeout(enterTimer)
            }
          }, 10)
        })
        item.addEventListener('mouseleave', function (e) {
          if (typeof enterTimer !== "undefined") {
            clearTimeout(enterTimer)
          }
          exitTimer = setInterval(function () {
            if (mesh.material.uniforms.u_height.value < 1) {
              mesh.material.uniforms.u_height.value += 0.05
            } else {
              clearTimeout(exitTimer)
            }
          }, 10)
        })
      }

      renderer.render( scene, camera )
      let t = 0

      const animate = function () {
        requestAnimationFrame( animate )
        if (!animationPause) renderAnim()
        function renderAnim () {
          renderer.render( scene, camera )
          mesh.material.uniforms.u_time.value = t
          t = t + 0.02
        }
      }

      animate()

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: controlAnimation
      });

      function controlAnimation() {
        animationPause = !ScrollTrigger.isInViewport(item)
      }
    })
  }
}

const capBox = document.querySelector('.cap__box')
if (capBox) setTimeout(() => createWave(config.individualItem, config.colors), 1000)
