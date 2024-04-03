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
        end: "top 10%",
      }
    })

    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.advantages__list',
        scrub: true,
        start: "top 80%",
        end: "top 10%",
      }
    })

    const t3 = gsap.timeline({
      scrollTrigger: {
        trigger: '.advantages__list',
        scrub: true,
        start: "top 80%",
        end: "top 10%",
      }
    })


    mm.add("(min-width: 1440px)", () => {
      tl.to('.advantages__inner', { x: '-100' })
      t2.to('.advantages__number', { width: '155' })
      t3.to('.advantages__bg-anim', { x: '-155' })
    })
  }
}
