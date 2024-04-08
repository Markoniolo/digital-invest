import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

const stepsDiagram = document.querySelector('.steps__diagram')

if (stepsDiagram) stepsDiagramInit()

function stepsDiagramInit () {
  const mm = gsap.matchMedia()
  const obj = { num: 0 }
  const percent = document.querySelector('.steps__diagram-percent')
  let stepsCircles = gsap.utils.toArray('.steps__diagram-circle')

  let t1 = gsap.timeline({
    scrollTrigger: {
      trigger: '.steps__area', scrub: true, start: "top 70%", end: "+=1300",
      onUpdate: () => percent.innerHTML = Math.round(100 * obj.num) + '%'
    }
  })
  mm.add("(min-width: 768px)", () => {
    t1.to(obj, { num: 1 })
  })

  stepsCircles.forEach((item, index) => {
    let t2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.steps__area',
        scrub: true,
        start: "top 90%",
        end: "+=1300"
      }
    })
    mm.add("(min-width: 768px)", () => {
      t2.to(item, {strokeDasharray: '0, 100'})
    })
  })
}
