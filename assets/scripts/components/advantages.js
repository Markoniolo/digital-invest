import gsap from "gsap";

const advantagesList = document.querySelector('.advantages__list')

if (advantagesList) advantagesListInit()

function advantagesListInit () {
  let mm = gsap.matchMedia()

  animateAdvantagesList()

  function animateAdvantagesList () {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.advantages__list',
        scrub: true,
        start: "top 60%",
        end: "top 10%",
      }
    })

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.advantages__list',
        scrub: true,
        start: "top 60%",
        end: "top 10%",
      }
    })

    mm.add("(min-width: 1440px)", () => {
      tl.to('.advantages__list', {x: '0', duration: '0.5'})
      t2.to('.advantages__number', { x: '0', width: '155', duration: '0.5' })
    })
  }
}
