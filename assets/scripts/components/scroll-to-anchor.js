const indent = 80

if (document.querySelector('[data-role="scroll-to-anchor"]')) initScrollToAnchor()

function initScrollToAnchor() {
    const anchorElements = document.querySelectorAll('[data-role="scroll-to-anchor"]')

    for (let i = 0, len = anchorElements.length; i < len; i++) _loopAddEventScrollToAnchor(anchorElements[i])

    function _loopAddEventScrollToAnchor(node) {
        node.addEventListener('click', clickOnTheScrollElement)
    }

    if (window.location.hash && window.innerWidth < 1240) {
      const element = document.getElementById(window.location.hash.substr(1))
      animateScrollToAnchor(element)
    }
}

function clickOnTheScrollElement(event) {
    event.preventDefault()
    let elementId
    if (this.dataset.link) {
      elementId = this.dataset.link.substr(1)
    } else {
      elementId = this.hash.substr(1)
    }
    const element = document.getElementById(elementId)

    const openModal = document.querySelector('.modal-cases_active')

    if (!element) return

    if (openModal) {
      setTimeout(() => animateScrollToAnchor(element), 600)
    } else {
      animateScrollToAnchor(element)
    }
}

function animateScrollToAnchor(theElement) {
    const positionNow = window.pageYOffset
    const positionElement = theElement.getBoundingClientRect().top + pageYOffset - indent
    const duration = 300
    const step = positionElement - positionNow
    const start = performance.now()

    requestAnimationFrame(function animate(time) {
        const timePassed = time - start

        if (timePassed > duration) {
            window.scrollTo(0, positionElement)
        } else {
            window.scrollTo(0, positionNow + step * (timePassed / duration))
            requestAnimationFrame(animate)
        }
    })
}
