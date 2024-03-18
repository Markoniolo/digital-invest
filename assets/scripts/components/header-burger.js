const header = document.querySelector('[data-element="header"]')

if (header) headerInit()

function headerInit () {
  const headerBurger = document.querySelector('[data-element="header-burger"]')
  headerBurger.addEventListener('click', toggleHeader)

  document.addEventListener('click', closeMenu)

  function toggleHeader () {
    header.classList.toggle('header_active')
  }

  function closeMenu (e) {
    if (!e.target.classList.contains('header__burger')) header.classList.remove('header_active')
  }
}
