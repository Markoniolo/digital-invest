import gsap from "gsap"

const lightBgBoxArray = document.querySelectorAll('[data-role="light-bg-box"]')

if (lightBgBoxArray.length) lightBgBoxArrayInit()

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

    function activateMousemoveHandler () {
      light.style.display = 'block'
      window.addEventListener('mousemove', mousemoveHandler)
    }

    function cancelMousemoveHandler () {
      light.style.display = 'none'
      window.removeEventListener('mousemove', mousemoveHandler)
    }

    function mousemoveHandler (e) {
      const rect = box.getBoundingClientRect()
      mm.add("(min-width: 1440px)", () => {
        gsap.to(targetClassName, {
          left: e.clientX - rect.left,
          top: e.clientY - rect.top,
          duration: 0.1
        });
      })
    }
  }
}
