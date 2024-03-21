const faqTopArray = document.querySelectorAll('[data-element="faq__top"]')

if (faqTopArray.length) faqTopArrayInit()

function faqTopArrayInit () {
  for (let i = 0; i < faqTopArray.length; i++) {
    faqTopArray[i].addEventListener('click', toggleFaqTop)
  }

  faqTopArray[0].click()

  function toggleFaqTop () {
    const item = this.closest('.faq__item')
    const content = item.querySelector('.faq__content')
    if (this.classList.contains('faq__top_active')) {
      faqTopClose(this, item, content)
    } else {
      faqTopOpen(this, item, content)
    }
  }

  function faqTopClose (faqTop, item, content) {
    item.classList.remove('faq__box_active')
    content.style.maxHeight = 0
    faqTop.classList.remove('faq__top_active')
  }

  function faqTopOpen (faqTop, item, content) {
    item.classList.add('faq__box_active')
    content.style.maxHeight = content.scrollHeight + "px"
    faqTop.classList.add('faq__top_active')
  }
}
