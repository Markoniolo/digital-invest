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
    if (window.innerWidth >= 1440) {
      delta = 144
    } else if (window.innerWidth >= 768) {
      delta = 72
    } else {
      delta = 36
    }
    ctx.beginPath()
    ctx.fillStyle = "#EAF1F4"
    ctx.rect(0, 0, window.innerWidth, window.innerHeight)
    ctx.fill()
  }

  // function updatePicture () {
  //   for (let i = 0; i < pictures.length; i++) {
  //     if (isVisible(pictures[i])) {
  //       const agree = gsap.timeline()
  //       agree.to(pictures[i], 0.3, {scale: 1.2})
  //     }
  //   }
  // }

  // function isVisible (el) {
  //   const rect = el.getBoundingClientRect()
  //   return (
  //     rect.top >= 0 &&
  //     rect.left >= 0 &&
  //     rect.bottom <= (window.innerHeight) &&
  //     rect.right <= (window.innerWidth + 200)
  //   );
  // }


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
    x = window.innerWidth
    delta = -Math.abs(delta)
    window.requestAnimationFrame(step)
  }

  function step(timeStamp) {
    if (start === undefined) {
      start = timeStamp;
    }
    if (previousTimeStamp !== timeStamp) {
      drawRect(x, delta)
      x += delta
      if (x >= window.innerWidth || x <= 0) done = true
    }
    previousTimeStamp = timeStamp
    if (!done) {
      setTimeout(() => window.requestAnimationFrame(step), 40)
    } else if (!stop) {
      if (delta > 0) {
        x = delta/2
      } else {
        x = window.innerWidth - delta/2
      }
      done = false
      stop = true
      setTimeout(() => window.requestAnimationFrame(step), 40)
    }
  }

  function drawRect (x, delta) {
    const windowHeight = window.innerHeight
    ctx.beginPath()
    ctx.fillStyle = "#EAF1F4"
    if (transparent) {
      ctx.clearRect(x, 0, delta/2, windowHeight)
    } else {
      ctx.rect(x, 0, delta/2, windowHeight)
      ctx.fill()
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
