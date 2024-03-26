const aboutArea = document.querySelector('[data-element="about-area"]')

if (aboutArea) aboutAreaInit()

function aboutAreaInit() {
  window.addEventListener('scroll', checkAboutArea)

  function checkAboutArea() {
    window.requestAnimationFrame(step)
  }

  function getTopCoord (aboutArea) {
    let box = aboutArea.getBoundingClientRect()
    return box.top + aboutArea.clientHeight
  }

  function updateAboutAreaTransform () {
    let topCoord = getTopCoord(aboutArea)
    let k = 1 - topCoord / (window.innerHeight - 100)
    if (k > 1 || !k) k = 1
    const transformX = k * 100
    aboutArea.style.transform = `translateX(-${transformX}px)`
  }

  let start, previousTimeStamp

  function step(timeStamp) {
    if (start === undefined) {
      start = timeStamp
    }
    const elapsed = timeStamp - start

    if (previousTimeStamp !== timeStamp) {
      updateAboutAreaTransform()
    }

    if (elapsed < 100) {
      previousTimeStamp = timeStamp
    }
  }
}
