import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const teamItems = document.querySelectorAll('[data-element="team-item"]')

if (teamItems.length) teamItemsInit()

function teamItemsInit () {
  animateTeamItems()

  function animateTeamItems () {
    let fadein = gsap.utils.toArray('.team__item')
    fadein.forEach((item, index) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          scrub: true,
          start: "top 90%",
          end: "top 10%"
        }
      })
      tl.to(item, {x: 0, scale: 1, opacity: 1,})
    })

    let fadeinStatus = gsap.utils.toArray('.team__status')
    fadeinStatus.forEach((item, index) => {
      let t2 = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          scrub: true,
          start: "top 40%",
          end: "top 30%"
        }
      })
      t2.to(item, {opacity: 1})
    })
  }
}
