const faqItemsArray = document.querySelectorAll('[data-element="faq__item"]')

if (faqItemsArray.length) setTimeout(faqItemsArrayInit, 0)

function faqItemsArrayInit () {
  for (let i = 0; i < faqItemsArray.length; i++) {
    faqItemsArray[i].addEventListener('click', toggleFaqItem)
  }

  faqItemsArray[0].click()

  function toggleFaqItem () {
    const content = this.querySelector('.faq__content')
    if (this.classList.contains('faq__item_active')) {
      faqItemClose(this, content)
    } else {
      faqItemOpen(this, content)
    }
  }

  function faqItemClose (item, content) {
    item.classList.remove('faq__item_active')
    content.style.height = 0
  }

  function faqItemOpen (item, content) {
    item.classList.add('faq__item_active')
    content.style.height = content.scrollHeight + "px"
  }
}
