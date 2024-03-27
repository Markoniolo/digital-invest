import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const modalCasesSlider = document.querySelector('[data-element="modal-cases-slider"]')

if (modalCasesSlider) modalCasesSliderInit()

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
      },
    },
  })

  swiper.on('slideNextTransitionStart', function (e) {
    updatePicture()
  });

  const modalCasesOpeners = document.querySelectorAll('[data-role="modal-cases-opener"]')
  const modalCases = document.querySelector('[data-element="modal-cases"]')
  const btnCloseCases = document.querySelector('[data-element="header__back-cases"]')
  const header = document.querySelector('[data-element="header"]')
  const html = document.getElementsByTagName('html')[0]
  const pictures = document.querySelectorAll('.modal-cases__picture')

  function updatePicture () {
    for (let i = 0; i < pictures.length; i++) {
      if (isVisible(pictures[i])) {
        const agree = gsap.timeline()
        agree.to(pictures[i], 1, {scale: 1.2})
      }
    }
  }

  function isVisible (el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight) &&
      rect.right <= (window.innerWidth + 200)
    );
  }


  for (let i = 0; i < modalCasesOpeners.length; i++) {
    modalCasesOpeners[i].addEventListener('click', openModalCases)
  }

  btnCloseCases.addEventListener('click', closeModalCases)

  function openModalCases () {
    const index = +this.getAttribute('data-index')
    modalCases.classList.add('modal-cases_active')
    header.classList.add('header_cases-modal')
    swiper.slideTo(index, 0)
    html.classList.add('html_no-scroll')
  }

  function closeModalCases() {
    html.classList.remove('html_no-scroll')
    modalCases.classList.remove('modal-cases_active')
    header.classList.remove('header_cases-modal')
  }
}
