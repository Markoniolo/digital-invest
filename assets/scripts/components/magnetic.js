const magneticItems = document.querySelectorAll('.magnetic')

if (magneticItems.length) magneticItemsInit()

function magneticItemsInit () {
  for (let i = 0; i < magneticItems.length; i++) {
    magneticItemInit(magneticItems[i])
  }

  const body = document.getElementsByTagName('body')[0]

  body.addEventListener('mousemove', checkCursorPosition)

  function checkCursorPosition (e) {
    const mousePosX = e.clientX
    const mousePosY = e.clientY
    // console.log('X: ' + mousePosX + ' | Y: ' + mousePosY)
  }
}

function magneticItemInit (node) {

}
