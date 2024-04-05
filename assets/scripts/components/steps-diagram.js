import gsap from "gsap";

const stepsDiagramCanvasArray = document.querySelectorAll(".steps__diagram-canvas")

if (stepsDiagramCanvasArray.length && window.innerWidth >= 768) setTimeout(stepsDiagramCanvasArrayInit,0)

function stepsDiagramCanvasArrayInit () {
  const mm = gsap.matchMedia()
  const percent = document.querySelector(".steps__diagram-percent")

  const obj = {num: 0}
  let stop = false
  let ctxArray = []
  const colors = ['#3A90B0','#67ABC4','#88BDD1']
  for (let i = 0; i < stepsDiagramCanvasArray.length; i++) {
    ctxArray[i] = stepsDiagramCanvasArray[i].getContext("2d")
  }

  updateCanvasSize()

  window.addEventListener('resize', updateCanvasSize)

  function updateCanvasSize () {
    if (window.innerWidth >= 768) {
      for (let i = 0; i < ctxArray.length; i++) {
        ctxArray[i].canvas.width = stepsDiagramCanvasArray[i].clientWidth
        ctxArray[i].canvas.height = stepsDiagramCanvasArray[i].clientHeight
      }
    }
  }

  function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, fillColor) {
    ctx.save()
    const gradient = ctx.createRadialGradient(radius, radius, radius/2, radius, radius, radius);
    gradient.addColorStop(0, "#2282A6")
    gradient.addColorStop(1, fillColor)

    ctx.fillStyle = gradient
    ctx.strokeStyle = gradient
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, startAngle, endAngle)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }

  function clearCanvas (ctx) {
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, stepsDiagramCanvasArray[0].width, stepsDiagramCanvasArray[0].height)
    ctx.restore()
  }

  function updateDiagram (ctx, canvas, color, startAngle, endAngle) {
    stop = true
    let done = false

    let speed = 0.01
    let step = Math.abs((endAngle - startAngle) / 60)

    window.requestAnimationFrame(animate)

    const percentNewValue = Math.round(100 * obj.num)
    if (percentNewValue > percent.innerHTML.slice(0, -1)) {
      percent.innerHTML = Math.round(100 * obj.num) + '%'
    }

    function animate () {
      drawPieSlice(ctx, Math.round(canvas.width/2), Math.round(canvas.height/2),
        Math.round(canvas.width/2)-1, startAngle, startAngle + step * speed, color)

      startAngle += step * speed
      if (startAngle > endAngle) {
        done = true
        startAngle -= step
      }

      if (!done) {
        speed += 0.1
        setTimeout(() => window.requestAnimationFrame(animate), 0)
      } else {
        stop = false
      }
    }
  }

  let t1 = gsap.timeline({
    scrollTrigger: {trigger: '.steps__area', scrub: true, start: "top 70%", end: "+=1200",
      onUpdate: ({direction}) => startAnimation(direction)}
  })

  mm.add("(min-width: 768px)", () => {
    t1.to(obj, {
      num: 1,
    })
  })

  async function startAnimation (direction) {
    let startAngle
    let endAngle
    startAngle = 3*Math.PI/2
    endAngle = 3*Math.PI/2 + 2 * Math.PI * obj.num
    updateDiagram(ctxArray[0], stepsDiagramCanvasArray[0], colors[1], startAngle, endAngle)
    // setTimeout( () => updateDiagram(ctxArray[1], stepsDiagramCanvasArray[1], colors[1], startAngle, endAngle), 100)
    // setTimeout( () => updateDiagram(ctxArray[2], stepsDiagramCanvasArray[2], colors[2], startAngle, endAngle), 200)
  }
}

