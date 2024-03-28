import gsap from "gsap";

const capBoxes = document.querySelectorAll('[data-element="cap-box"]')
const capArea = document.querySelector('.cap__area')

if (capBoxes.length) capBoxesInit()

function capBoxesInit () {

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
      tl.to(item, {
        y: offset,
      })
    })
  }
}
