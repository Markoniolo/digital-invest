const capBoxes = document.querySelectorAll('[data-element="cap-box"]')
const capArea = document.querySelector('.cap__area')

if (capBoxes.length) capBoxesInit()

function capBoxesInit () {
  let timer = 50
  let reload = false

  if (window.innerWidth >= 1440) {
    window.addEventListener('scroll', checkCapBoxes)
  }

  function elementIsVisible (el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= -el.clientHeight &&
      rect.bottom <= (window.innerHeight + el.clientHeight)
    )
  }

  function checkCapBoxes () {
    if (elementIsVisible(capArea)) updateBoxes()
  }

  function updateBoxes() {
    if (!reload || !timer) {
      reload = true
      for (let i = 0; i < capBoxes.length; i++) {
        updateBoxTransform(capBoxes[i])
      }
      if (timer) {
        setTimeout(() => reload = false, timer)
      }
    }
  }

  function updateBoxTransform (box) {
    let topCoord = getTopCoord(box)
    if (topCoord < 0) topCoord = 0
    let k = 1 - topCoord / (window.innerHeight - box.clientHeight)
    if (k > 1) k = 1
    if (k < 0) k = 0
    const transformY = k * box.getAttribute('data-transform')
    box.style.transform = `translateY(${transformY}px)`
  }

  function getTopCoord (elem) {
    let box = elem.getBoundingClientRect()
    return box.top
  }
}
