const casesBoxes = document.querySelectorAll('.cases__box')
const casesArea = document.querySelector('.cases__area')

if (casesBoxes.length) casesBoxesInit()

function casesBoxesInit () {
  const casesWrap = document.querySelector('[data-element="cases-wrap"]')

  let timer = 50
  let reload = false

  if (window.innerWidth >= 1440) {
    window.addEventListener('scroll', checkCasesBoxes)
  }

  function elementIsVisible (el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= -el.clientHeight &&
      rect.bottom <= (window.innerHeight + el.clientHeight)
    )
  }

  function checkCasesBoxes () {
    if (elementIsVisible(casesArea)) updateBoxes()
  }

  function updateBoxes() {
    if (!reload || !timer) {
      reload = true
      for (let i = 0; i < casesBoxes.length; i++) {
        updateBoxTransform(casesBoxes[i])
      }
      updateCasesWrapTransform()
      if (timer) {
        setTimeout(() => reload = false, timer)
      }
    }
  }

  function updateCasesWrapTransform () {
    let box = casesWrap.getBoundingClientRect()
    let wrapTopCoord = box.top
    let wrapBottomCoord = box.bottom
    console.log(wrapBottomCoord)
    if (wrapTopCoord < window.innerHeight/2 + casesWrap.clientHeight/2) {
      casesWrap.style.opacity = "0.2"
    } else {
      casesWrap.style.opacity = "1"
    }
    if (wrapBottomCoord < window.innerHeight/2 + casesWrap.clientHeight/2) {
      casesWrap.style.opacity = "0"
    }
  }

  function updateBoxTransform (box) {
    let topCoord = getTopCoord(box)
    let k = 1 - topCoord / (window.innerHeight - box.clientHeight)
    const transformY = k * box.getAttribute('data-transform')
    box.style.transform = `translateY(-${transformY}px)`
  }

  function getTopCoord (elem) {
    let box = elem.getBoundingClientRect()
    return box.top
  }
}
