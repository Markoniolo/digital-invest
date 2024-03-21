const stepsSection = document.querySelector('[data-element="steps"]')

if (stepsSection) stepsSectionInit()

function stepsSectionInit () {
  const stepsItems = stepsSection.querySelectorAll('[data-element="steps-item"]')
  if (stepsItems.length) stepsItemsInit()

  function stepsItemsInit () {
    window.addEventListener('scroll', checkStepsItems)

    function checkStepsItems () {
      for (let i = 0; i < stepsItems.length; i++) {
        if (elementIsVisible(stepsItems[i])) {
          stepsItems[i].classList.add('steps__item_fade')
        }
      }
    }

    function elementIsVisible (el) {
      const rect = el.getBoundingClientRect()
      return (
        rect.top >= 100 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - 100
      )
    }
  }
}
