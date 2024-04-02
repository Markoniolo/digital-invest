import gsap from "gsap";

const advantagesList = document.querySelector('.advantages__list')

if (advantagesList) setTimeout(advantagesListInit, 0)

function advantagesListInit () {
  let mm = gsap.matchMedia()

  animateAdvantagesList()

  function animateAdvantagesList () {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.advantages__list',
        scrub: true,
        start: "top 80%",
        end: "top 20%",
      }
    })

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.advantages__list',
        scrub: true,
        start: "top 80%",
        end: "top 20%",
      }
    })

    mm.add("(min-width: 1440px)", () => {
      tl.to('.advantages__list', {x: '-100', duration: '0.5'})
      t2.to('.advantages__number', { x: '-100', width: '155', duration: '0.5' })
    })
  }
}
