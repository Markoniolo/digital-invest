const formValidateArray = document.querySelectorAll('[data-role="form-validate"]')

if (formValidateArray.length) formValidateArrayInit()

function formValidateArrayInit () {
  for (let i = 0; i < formValidateArray.length; i++) {
    formValidateInit(formValidateArray[i])
  }
}

function formValidateInit (form) {
  const labelPhone = form.querySelector('[data-role="form-validate-phone"]')
  const labelName = form.querySelector('[data-role="form-validate-name"]')

  const inputPhone = labelPhone.getElementsByTagName('input')[0]
  const inputName = labelName.getElementsByTagName('input')[0]

  inputPhone.addEventListener('input', removeError)
  inputName.addEventListener('input', removeError)
  form.addEventListener('submit', validate)

  const maskPhone = new IMask(inputPhone, { mask: '+{7} (000) 000-00-00' });
  const maskName = new IMask(inputName, { mask: /^[А-ЯЁa-zA-Z\s]+$/i });

  function removeError () {
    this.classList.remove('input-error')
  }

  function validate (e) {
    e.preventDefault()
    let isValid = true
    if (maskPhone.unmaskedValue.length < 11) {
      inputPhone.classList.add('input-error')
      isValid = false
    }
    if (!inputName.value) {
      inputName.classList.add('input-error')
      isValid = false
    }
    if (isValid) fetchForm()
  }

  async function fetchForm () {
    const url = form.getAttribute('action')
    fetch(url, {
      method: 'post',
      body: new FormData(form),
    })
      .then(res => { return res.json() })
      .then(data => { success() })
      .catch(() => {
        console.log('error')
      })

    success()

    function success () {
      openThanks()
      inputPhone.value = ''
      inputName.value = ''
    }
  }

  function openThanks () {
    if (form.classList.contains('modal-order__form')) {
      const modalOrder = form.closest('.modal-order')
      modalOrder.classList.add('modal-order_thanks')
      const timerId = setInterval(updateCounter, 1000)
      const closeBtn = modalOrder.querySelector('[data-role="modal-close"]')
      const counter = modalOrder.querySelector('.modal-order__counter')

      function updateCounter () {
        counter.innerHTML = +counter.innerHTML - 1
        if (counter.innerHTML === "0") {
          clearInterval(timerId)
          closeBtn.click()
          modalOrder.classList.remove('modal-order_thanks')
          counter.innerHTML = '10'
        }
      }
    }
  }
}
