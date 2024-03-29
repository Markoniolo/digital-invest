import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const casesBoxes = document.querySelectorAll('.cases__box')
if (casesBoxes.length) casesBoxesInit()

function casesBoxesInit () {
  const mm = gsap.matchMedia()

  animateCasesBox()
  animateCasesWrap()

  function animateCasesWrap () {
    mm.add("(min-width: 1440px)", () => {
      gsap.to('.cases__wrap', {
        scrollTrigger: {
          trigger: '.cases__wrap',
          start: "top 50%",
          scrub: true
        },
        opacity: 0.2,
        duration: 1,
      })

      gsap.to('.cases__wrap', {
        scrollTrigger: {
          trigger: '.order',
          start: "top 100%",
          end: "top 90%",
          scrub: true
        },
        opacity: 0,
        duration: 0.5,
        immediateRender: false,
      })
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

      mm.add("(min-width: 1440px)", () => {
        tl.to(item, {
          y: offset,
        })
      })

    })
  }
}
