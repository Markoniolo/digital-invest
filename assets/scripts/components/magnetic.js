import gsap from "gsap"

const magneticItems = document.querySelectorAll('.magnetic')

if (magneticItems.length) setTimeout(magneticItemsInit,0)

function magneticItemsInit () {
  for (let i = 0; i < magneticItems.length; i++) {
    magneticItemInit(magneticItems[i])
  }
}

function magneticItemInit (node) {
  const mm = gsap.matchMedia()

  const nodeChild = node.querySelector('.magnetic-inner')

  node.addEventListener('mousemove', function(e) {
    moveTarget(e, 50);
  });

  node.addEventListener('mouseout', function() {
    mm.add("(min-width: 1440px)", () => {
      gsap.to(nodeChild, {
        x: 0,
        y: 0
      })
    })
  })

  function moveTarget(e, force) {
    const boundingRect = node.getBoundingClientRect()
    const relX = e.pageX - boundingRect.left
    const relY = e.pageY - boundingRect.top - window.pageYOffset

    mm.add("(min-width: 1440px)", () => {
      gsap.to(nodeChild, {
        x: (relX - boundingRect.width / 2) / boundingRect.width * force,
        y: (relY - boundingRect.height / 2) / boundingRect.height * force,
      })
    })
  }
}
