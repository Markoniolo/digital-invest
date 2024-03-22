const modalOpeners = document.querySelectorAll('[data-role="modal-opener"]')

if (modalOpeners.length) modalsInit()

function modalsInit () {
  for (let i = 0; i < modalOpeners.length; i++) {
    modalOpenerInit(modalOpeners[i])
  }
}

function modalOpenerInit (btnOpenModal) {
  const className = btnOpenModal.getAttribute('data-modal-class')
  const modal = document.querySelector(`.${className}`)
  const layer = modal.querySelector('[data-role="modal-layer"]')
  const close = modal.querySelector('[data-role="modal-close"]')
  btnOpenModal.addEventListener('click', openModal)
  layer.addEventListener('click', closeModal)
  close.addEventListener('click', closeModal)

  function openModal() {
    modal.classList.add('modal_active')
  }

  function closeModal() {
    modal.classList.remove('modal_active')
  }
}
