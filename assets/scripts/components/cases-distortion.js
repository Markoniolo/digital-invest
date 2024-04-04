import gsap from "gsap"
import * as THREE from 'three'

const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

const FRAGMENT_SHADER = `
varying vec2 vUv;

uniform sampler2D fromTexture;
uniform sampler2D toTexture;
uniform sampler2D displacementTexture;
uniform float dispositionFactor;
uniform float intensityFactor;
uniform vec2 scale;
uniform vec2 imageSize;
uniform vec2 containerSize;

void main() {
  vec2 uv = vUv;

  vec2 s = containerSize; // Screen
  vec2 i = imageSize; // Image

  // container ration
  float rs = containerSize.x / containerSize.y;
  // image ration
  float ri = imageSize.x / imageSize.y;

  vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
  vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
  vec2 resultCoordinate = uv * s / new + offset;

  vec4 displacementTexture = texture2D(displacementTexture, uv);
  vec2 distortedPosition = vec2(resultCoordinate.x + dispositionFactor * (displacementTexture.r*intensityFactor), resultCoordinate.y);
  vec2 distortedPosition2 = vec2(resultCoordinate.x - (1.0 - dispositionFactor) * (displacementTexture.r*intensityFactor), resultCoordinate.y);

  vec4 _texture = texture2D(fromTexture, distortedPosition);
  vec4 _texture2 = texture2D(toTexture, distortedPosition2);

  vec4 finalTexture = mix(_texture, _texture2, dispositionFactor);

  gl_FragColor = finalTexture;
}
`

const getDistortionShaderMaterialParameters = ({ intensity, fromTexture, toTexture, displacementTexture, dispositionFactor = 0, scale = new THREE.Vector2(1, 1), containerSize = new THREE.Vector2(), imageSize = new THREE.Vector2(), }) => ({
  uniforms: {
    intensityFactor: {
      value: intensity,
    },
    dispositionFactor: {
      value: dispositionFactor,
    },
    fromTexture: {
      value: fromTexture,
    },
    toTexture: {
      value: toTexture,
    },
    displacementTexture: {
      value: displacementTexture,
    },
    scale: {
      value: scale,
    },
    containerSize: {
      value: containerSize,
    },
    imageSize: {
      value: imageSize,
    },
  },
  vertexShader: VERTEX_SHADER,
  fragmentShader: FRAGMENT_SHADER,
  transparent: true,
  opacity: 1,
})

const textureDisplacement = new THREE.TextureLoader().load('/statics/img/cases/distortion.jpg')

const casesDistortionArray = document.querySelectorAll('.cases__box')
if (casesDistortionArray.length) casesDistortionInit()

function casesDistortionInit () {
  for (let i = 0; i < casesDistortionArray.length; i++) {
    caseDistortionInit(casesDistortionArray[i])
  }
}

function caseDistortionInit (node) {
  const containerEl = node
  const dataSrc = node.getAttribute('data-src')
  const containerElem = node
  const canvasEl = node.querySelector('.cases__canvas')

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(
    containerElem.offsetWidth / -2,
    containerElem.offsetWidth / 2,
    containerElem.offsetHeight / 2,
    containerElem.offsetHeight / -2,
    0
  )

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvasEl,
  })

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0xffffff, 1)

  const sceneController = {
    scene,
    camera,
    renderer,
  };

  const rendererCapabilities = sceneController.renderer.capabilities.getMaxAnisotropy()
  const textureFirst = new THREE.TextureLoader().load(dataSrc)
  const texture = textureFirst
  texture.minFilter = texture.magFilter = THREE.LinearFilter
  texture.anisotropy = rendererCapabilities
  const textureSecond = new THREE.TextureLoader().load(dataSrc)

  const textures = {
    first: textureFirst,
    second: textureSecond,
    displacement:textureDisplacement
  }

  function update () {
    updateSize()
    updateTexturesSize()
    renderer.render(scene, camera)
  }

  function updateSize () {
    const { width, height } = containerElem.getBoundingClientRect()
    renderer.setSize(width, height)
  }

  textures.displacement.wrapS = textures.displacement.wrapT =
      THREE.RepeatWrapping;

  const material = new THREE.ShaderMaterial(
    getDistortionShaderMaterialParameters({
      intensity: 0.5,
      fromTexture: textures.first,
      toTexture: textures.second,
      displacementTexture: textures.displacement,
      imageSize: new THREE.Vector2(
        containerEl.getBoundingClientRect().width,
        containerEl.getBoundingClientRect().height
      ),
      containerSize: new THREE.Vector2(
        containerEl.getBoundingClientRect().width,
        containerEl.getBoundingClientRect().height
      )
    })
  )

  function updateTexturesSize() {
    if (textures === null) {
      return
    }
    material.uniforms.imageSize.value = new THREE.Vector2(
      containerEl.getBoundingClientRect().width,
      containerEl.getBoundingClientRect().height
    );

    material.uniforms.containerSize.value = new THREE.Vector2(
      containerEl.getBoundingClientRect().width,
      containerEl.getBoundingClientRect().height
    );
  }

  const geometry = new THREE.PlaneGeometry(
    containerEl.offsetWidth,
    containerEl.offsetHeight,
    1
  )

  const object = new THREE.Mesh(geometry, material)

  sceneController.scene.add(object)

  containerEl.addEventListener('mouseenter', animate)
  containerEl.addEventListener('mouseleave', animateLeave)

  animateLeave()

  function animate() {
    gsap.to(material.uniforms.dispositionFactor, {
      value: 1,
      duration: 0.6,
      onUpdate() {
        update();
      },
    })
  }

  function animateLeave () {
    gsap.to(material.uniforms.dispositionFactor, {
      value: 0,
      duration: 0.6,
      onUpdate() {
        update();
      },
    })
  }
}
