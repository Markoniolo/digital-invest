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

    function activateMousemoveHandler () {
      light.style.opacity = '1'
      window.addEventListener('mousemove', mousemoveHandler)
    }

    function cancelMousemoveHandler () {
      light.style.opacity = '0'
      window.removeEventListener('mousemove', mousemoveHandler)
    }

    function mousemoveHandler (e) {
      const rect = box.getBoundingClientRect()
      mm.add("(min-width: 1440px)", () => {
        let top = e.clientY - rect.top
        if (top < 73) top = 73
        gsap.to(targetClassName, {
          left: e.clientX - rect.left,
          top: top,
          duration: 0.1
        });
      })
    }
  }
}
