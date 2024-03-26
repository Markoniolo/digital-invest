const stepsItems = document.querySelectorAll('[data-element="steps-item"]')

if (stepsItems.length) stepsItemsInit()

function stepsItemsInit () {
  let transformDelta
  let timer = 100
  let reload = false

  if (window.innerWidth < 768) {
    transformDelta = -50
  } else if (window.innerWidth < 1440) {
    transformDelta = -65
  } else {
    timer = 50
    transformDelta = -70
  }

  window.addEventListener('scroll', updateStepsItems)

  function updateStepsItems() {
    if (!reload || !timer) {
      reload = true
      for (let i = 0; i < stepsItems.length; i++) {
        updateStepsItemTransform(stepsItems[i])
      }
      if (timer) {
        setTimeout(() => reload = false, timer)
      }
    }
  }

  function updateStepsItemTransform (item) {
    let topCoord = getTopCoord(item)
    if (topCoord < 0) topCoord = 0
    let k = topCoord / (window.innerHeight - item.clientHeight)
    if (k > 1) k = 1
    if (k < 0) k = 0
    const transformX = k * transformDelta
    item.style.transform = `translateX(${transformX}px) scale(${1 - k*0.25})`
    item.style.opacity = `${1 - k*0.8}`
  }

  function getTopCoord (elem) {
    let box = elem.getBoundingClientRect()
    return box.top - 2*elem.clientHeight
  }
}
