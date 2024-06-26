import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const casesBoxes = document.querySelectorAll('.cases__box')
if (casesBoxes.length) setTimeout(casesBoxesInit, 0)

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
          end: "+=1500",
          scrub: true
        },
        opacity: 0,
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
          start: "top 100%"
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
