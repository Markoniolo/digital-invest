const modalOpeners = document.querySelectorAll('[data-role="modal-opener"]')
const modals = document.querySelectorAll('[data-role="modal"]')
const html = document.getElementsByTagName('html')[0]

if (modalOpeners.length) modalOpenersInit()
if (modals.length) modalsInit()

function modalOpenersInit () {
  for (let i = 0; i < modalOpeners.length; i++) {
    modalOpenerInit(modalOpeners[i])
  }
}

function modalsInit () {
  for (let i = 0; i < modals.length; i++) {
    modalInit(modals[i])
  }
}

function modalOpenerInit (btnOpenModal) {
  const className = btnOpenModal.getAttribute('data-modal-class')
  const modal = document.querySelector(`.${className}`)

  btnOpenModal.addEventListener('click', openModal)

  function openModal() {
    modal.classList.add('modal_active')
    html.classList.add('html_no-scroll')
  }
}

function modalInit (modal) {
  const layer = modal.querySelector('[data-role="modal-layer"]')
  const close = modal.querySelector('[data-role="modal-close"]')
  layer.addEventListener('click', closeModal)
  close.addEventListener('click', closeModal)

  function closeModal() {
    modal.classList.remove('modal_active')
    html.classList.remove('html_no-scroll')
  }
}
