import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const casesBoxes = document.querySelectorAll('.cases__box')
if (casesBoxes.length) casesBoxesInit()

function casesBoxesInit () {
  animateCasesBox()
  animateCasesWrap()

  function animateCasesWrap () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.cases__wrap',
        scrub: true,
        start: "top 50%",
      }
    })
    tl.to('.cases__wrap', {
      opacity: 0.2,
      duration: 1,
    })
  }

  function animateCasesBox () {
    let fadein = gsap.utils.toArray('.cases__box')
    fadein.forEach((item, index) => {
      const offset = -item.getAttribute('data-transform')
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          scrub: true,
          start: "top 50%"
        }
      })
      tl.to(item, {
        y: offset,
      })
    })
  }
}
