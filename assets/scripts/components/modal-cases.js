import gsap from "gsap"

const modalCasesSlider = document.querySelector('[data-element="modal-cases-slider"]')

if (modalCasesSlider) setTimeout(modalCasesSliderInit, 0)

function modalCasesSliderInit () {
  const swiper = new Swiper(modalCasesSlider, {
    slidesPerView: "auto",
    direction: "vertical",
    loop: true,
    spaceBetween: 0,
    freeMode: {
      enabled: true,
    },
    mousewheel: true,
    breakpoints: {
      1439: {
        spaceBetween: 50,
        direction: "horizontal",
        speed: 1000,
        freeMode: {
          enabled: false,
        },
      },
    },
  })

  swiper.on('slideNextTransitionStart', function (e) {
    // updatePicture()
  });

  const modalCasesOpeners = document.querySelectorAll('[data-role="modal-cases-opener"]')
  const modalCases = document.querySelector('[data-element="modal-cases"]')
  const btnCloseCases = document.querySelector('[data-element="header__back-cases"]')
  const header = document.querySelector('[data-element="header"]')
  const html = document.getElementsByTagName('html')[0]
  const pictures = document.querySelectorAll('.modal-cases__picture')

  const canvas = document.querySelector('.modal-cases-canvas')
  const ctx = canvas.getContext("2d")

  let x
  let transparent = false
  let delta
  let start, previousTimeStamp
  let done = false
  let stop = false

  window.addEventListener('resize', updateCanvasSize)

  updateCanvasSize()

  function updateCanvasSize () {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    delta = 144
    ctx.beginPath()
    ctx.fillStyle = "#EAF1F4"
    ctx.rect(0, 0, window.innerWidth, window.innerHeight)
    ctx.fill()
  }

  for (let i = 0; i < modalCasesOpeners.length; i++) {
    modalCasesOpeners[i].addEventListener('click', openModalCases)
  }

  btnCloseCases.addEventListener('click', closeModalCases)

  function canvasCasesAnimation () {
    done = false
    stop = false
    transparent = false
    x = 0
    delta = Math.abs(delta)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    window.requestAnimationFrame(step)
  }

  function canvasCasesAnimationReverse () {
    done = false
    stop = false
    transparent = true
    x = 0
    delta = -Math.abs(delta)
    window.requestAnimationFrame(step)
  }

  function step(timeStamp) {
    if (start === undefined) {
      start = timeStamp
    }
    if (previousTimeStamp !== timeStamp) {
      drawRect(x, delta)
      x += delta/36
      if (x >= delta/2 && delta > 0) done = true
      if (x <= delta/2 && delta < 0) done = true
    }
    previousTimeStamp = timeStamp
    if (!done) {
      setTimeout(() => window.requestAnimationFrame(step), 20)
    } else if (!stop) {
      x = 0
      done = false
      stop = true
      setTimeout(() => window.requestAnimationFrame(step), 20)
    }
  }

  function drawRect (x, delta) {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    ctx.beginPath()
    ctx.fillStyle = "#EAF1F4"
    if (transparent) {
      for (let step = window.innerWidth; step > 0; step+=delta/2) {
        ctx.clearRect(step + x, 0, delta/36, windowHeight)
      }
    } else {
      for (let step = 0; step < windowWidth; step+=delta/2) {
        ctx.rect(step + x, 0, delta/36, windowHeight)
        ctx.fill()
      }
    }
  }

  function openModalCases () {
    canvasCasesAnimation()
    const index = +this.getAttribute('data-index')
    modalCases.classList.add('modal-cases_active')
    header.classList.add('header_cases-modal')
    swiper.slideTo(index, 0)
    html.classList.add('html_no-scroll')
  }

  function closeModalCases() {
    canvasCasesAnimationReverse()
    html.classList.remove('html_no-scroll')
    modalCases.classList.remove('modal-cases_active')
    header.classList.remove('header_cases-modal')
  }
}
