const lightBgBoxArray = document.querySelectorAll('[data-role="light-bg-box"]')

if (lightBgBoxArray.length) lightBgBoxArrayInit()

function lightBgBoxArrayInit () {
  window.addEventListener('resize', checkWindowSize)
  checkWindowSize()

  function checkWindowSize () {
    if (window.innerWidth >= 1440) lightBgBoxArrayActivate()
  }

  function lightBgBoxArrayActivate () {
    for (let i = 0; i < lightBgBoxArray.length; i++) {
      lightBgBoxInit(lightBgBoxArray[i])
    }
  }

  function lightBgBoxInit (box) {
    const light = box.querySelector('[data-role="light-bg"]')
    if (!light) return

    let timer = 20
    let reload = false

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
      if (!reload || !timer) {
        reload = true
        const rect = box.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        light.style.top = y + 'px'
        light.style.left = x + 'px'
        if (timer) {
          setTimeout(() => reload = false, timer)
        }
      }
    }
  }
}
