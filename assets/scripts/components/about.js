const about = document.querySelector('[data-element="about-area"]')

if (about) aboutInit()

function aboutInit() {
  window.addEventListener('scroll', checkAbout)

  function checkAbout() {
    const rect = about.getBoundingClientRect()
    if (rect.bottom <= (window.innerHeight / 2 + 100)) {
      about.classList.add('about__area_scroll')
    } else {
      about.classList.remove('about__area_scroll')
    }
  }
}
