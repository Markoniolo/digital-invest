import gsap from "gsap"

const capBoxes = document.querySelectorAll('[data-element="cap-box"]')

if (capBoxes.length) capBoxesInit()

function capBoxesInit () {
  const mm = gsap.matchMedia()

  animateCapBoxes()

  function animateCapBoxes () {
    let fadein = gsap.utils.toArray('.cap__box')
    fadein.forEach((item, index) => {
      const offset = item.getAttribute('data-transform')
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
