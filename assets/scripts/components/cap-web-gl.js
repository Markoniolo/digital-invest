import * as THREE from '../modules/three.js';

// Helper functions
const rgb = function(r, g, b) {
  return new THREE.Vector3(r, g, b);
}
const loader = function(path, texture) {
  return new Promise((resolve, reject) => {
    let loader = new THREE.FileLoader();
    if(typeof texture !== "undefined") {
      loader = new THREE.TextureLoader();
    }
    loader.load(path, (item) => resolve(item));
  })
}
const randomInteger = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// -- End Helper Functions

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
const createWave = async function(selector, colors) {
  if(document.querySelectorAll(selector) !== null && document.querySelectorAll(selector).length > 0) {
    // Import all the fragment and vertex shaders
    const noise = document.getElementById('noise').textContent;
    const fragment = document.getElementById('fragment').textContent
    const vertex =document.getElementById('vertex').textContent
    let i = 0;
    // For each of the selector elements
    document.querySelectorAll(selector).forEach(function(item) {
      // Create a renderer

      const newCanvas = document.createElement('canvas');
      newCanvas.id = `canvas-${i}`;
      item.appendChild(newCanvas);

      const renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true,
        alpha: true,
        canvas: document.getElementById(`canvas-${i}`)
      });


      // Get el width and height
      let elWidth
      let elHeight

      if (window.innerWidth < 768) {

        elWidth = 343
        elHeight = 336
      } else {
        elWidth = 686
        elHeight = 672
        // elWidth = parseFloat(window.getComputedStyle(item).width);
        // elHeight = parseFloat(window.getComputedStyle(item).height);
      }

      // Set sizes and set scene/camera
      renderer.setSize( elWidth, elHeight );
      // renderer.setPixelRatio( window.devicePixelRatio );

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 75, elWidth / elHeight, 0.1, 1000 );

      // Check on colors to use
      let high = colors[0].high;
      let low = colors[0].low;
      if(typeof colors[i] !== "undefined") {
        high = colors[i].high;
        low = colors[i].low;
        ++i;
      }

      // And use the high color for the subtext.
      if(item.querySelector('.subtext') !== null) {
        item.querySelector('.subtext').style.background = `rgba(${high.x},${high.y},${high.z},0.75)`;
      }

      // Create a plane, and pass that through to our shaders
      let geometry = new THREE.PlaneGeometry(600, 600, 100, 100);
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
      });

      // Create the mesh and position appropriately
      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, -300);
      mesh.material.needsUpdate = true;
      scene.add(mesh);

      // On hover effects for each item
      let enterTimer, exitTimer;
      item.addEventListener('mouseenter', function(e) {
        if(typeof exitTimer !== "undefined") {
          clearTimeout(exitTimer);
        }
        enterTimer = setInterval(function() {
          if(mesh.material.uniforms.u_height.value >= 0.5) {
            mesh.material.uniforms.u_height.value -= 0.05;
          } else {
            clearTimeout(enterTimer);
          }
        }, 10);
      });
      item.addEventListener('mouseleave', function(e) {
        if(typeof enterTimer !== "undefined") {
          clearTimeout(enterTimer);
        }
        exitTimer = setInterval(function() {
          if(mesh.material.uniforms.u_height.value < 1) {
            mesh.material.uniforms.u_height.value += 0.05;
          } else {
            clearTimeout(exitTimer);
          }
        }, 10);
      });

      // Render
      renderer.render( scene, camera );
      let t = 0;

      // Animate
      const animate = function () {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
        mesh.material.uniforms.u_time.value = t;
        t = t + 0.02;
      };
      animate();
    });
  }
}

const capBox = document.querySelector('.cap__box')
if (capBox) setTimeout(createWave(config.individualItem, config.colors), 0);
