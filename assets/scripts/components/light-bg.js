import gsap from "gsap"

const lightBgBoxArray = document.querySelectorAll('[data-role="light-bg-box"]')

if (lightBgBoxArray.length) setTimeout(lightBgBoxArrayInit,0)

function lightBgBoxArrayInit () {
  const mm = gsap.matchMedia()

  lightBgBoxArrayActivate()

  function lightBgBoxArrayActivate () {
    for (let i = 0; i < lightBgBoxArray.length; i++) {
      lightBgBoxInit(lightBgBoxArray[i])
    }
  }

  function lightBgBoxInit (box) {
    const targetClassName = box.getAttribute('data-target')
    const light = box.querySelector(targetClassName)
    box.addEventListener('mouseenter', activateMousemoveHandler)
    box.addEventListener('mouseleave', cancelMousemoveHandler)
    box.addEventListener('mousemove', mousemoveHandler)

    function activateMousemoveHandler () {
      light.classList.add('footer__light_active')
    }

    function cancelMousemoveHandler () {
      light.classList.remove('footer__light_active')
    }

    function mousemoveHandler (e) {
      const rect = box.getBoundingClientRect()
      mm.add("(min-width: 1440px)", () => {
        let top = e.clientY - rect.top
        if (top < 73) top = 73
        light.style.transform = `translate(${e.clientX - rect.left}px, ${top}px)`
      })
    }
  }
}
