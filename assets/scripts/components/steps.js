import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const stepsItems = document.querySelectorAll('[data-element="steps-item"]')

if (stepsItems.length) setTimeout(stepsItemsInit, 0)

function stepsItemsInit () {
  animateStepsItems()

  function animateStepsItems () {
    let fadein = gsap.utils.toArray('.steps__item')
    fadein.forEach((item, index) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          scrub: true,
          start: "top 90%",
          end: "top 30%"
        }
      })
      tl.to(item, {
        x: 0, scale: 1, opacity: 1,
      })
    })
  }
}
