const aboutArea = document.querySelector('[data-element="about-area"]')

if (aboutArea) aboutAreaInit()

function aboutAreaInit () {
  let transformDelta
  let timer = 100
  let reload = false

  if (window.innerWidth < 768) {
    transformDelta = -360
  } else if (window.innerWidth < 1440) {
    transformDelta = -450
  } else {
    timer = 50
    transformDelta = -216
  }

  function elementIsVisible (el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= -el.clientHeight &&
      rect.bottom <= (window.innerHeight + el.clientHeight)
    )
  }

  window.addEventListener('scroll', updateAboutArea)

  function updateAboutArea() {
    if (elementIsVisible(aboutArea)) {
      if (!reload || !timer) {
        reload = true
        updateAboutAreaTransform()
        if (timer) {
          setTimeout(() => reload = false, timer)
        }
      }
    }
  }

  function updateAboutAreaTransform () {
    let topCoord = getTopCoord(aboutArea)
    if (topCoord < 0) topCoord = 0
    let k = topCoord / (window.innerHeight - aboutArea.clientHeight)
    // if (k > 1) k = 1
    // if (k < 0) k = 0
    const transformX = (1 - k) * transformDelta
    aboutArea.style.transform = `translateX(${transformX}px)`
  }

  function getTopCoord (elem) {
    let box = elem.getBoundingClientRect()
    return box.top - 2*elem.clientHeight
  }
}
