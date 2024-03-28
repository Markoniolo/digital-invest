import gsap from "gsap";

const aboutArea = document.querySelector('[data-element="about-area"]')

if (aboutArea) aboutAreaInit()

function aboutAreaInit () {
  let mm = gsap.matchMedia()

  animateAboutArea()

  function animateAboutArea () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about__area',
        scrub: true,
        start: "top 80%",
      }
    })

    mm.add("(max-width: 1439px)", () => {
      tl.to('.about__area', {x: '-50%',})
    })

    mm.add("(min-width: 1440px)", () => {
      tl.to('.about__area', {x: '0',})
    })
  }
}
