const teamItems = document.querySelectorAll('[data-element="team-item"]')

if (teamItems.length) teamItemsInit()

function teamItemsInit () {
  window.addEventListener('scroll', checkTeamItems)

  function checkTeamItems () {
    for (let i = 0; i < teamItems.length; i++) {
      if (elementIsVisible(teamItems[i])) {
        teamItems[i].classList.add('team__item_fade')
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
