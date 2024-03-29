import gsap from "gsap";

const stepsDiagramCanvasArray = document.querySelectorAll(".steps__diagram-canvas")

if (stepsDiagramCanvasArray.length && window.innerWidth >= 768) stepsDiagramCanvasArrayInit()

function stepsDiagramCanvasArrayInit () {
  const mm = gsap.matchMedia()
  const percent = document.querySelector(".steps__diagram-percent")

  const obj = {num: 0}
  let stop = false
  let ctxArray = []
  const colors = ['#3A90B0','#67ABC4','#88BDD1']
  const angleDeltaArray = [0,0.3,0]

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

  function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, fillColor, strokeColor) {
    ctx.save()
    ctx.fillStyle = fillColor
    ctx.strokeStyle = strokeColor
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

  function updateDiagram (ctx, canvas, color, angleDelta) {
    stop = true

    clearCanvas(ctx)

    let startAngle = 3*Math.PI/2
    let endAngle = 3*Math.PI/2 + 2 * Math.PI * obj.num

    drawPieSlice(ctx, Math.round(canvas.width/2), Math.round(canvas.height/2),
      Math.round(canvas.width/2)-1, startAngle, endAngle + angleDelta, color, "rgba(136, 189, 209, 0)")

    percent.innerHTML = Math.round(100 * obj.num) + '%'
  }

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.steps__area',
      scrub: true,
      start: "top 20%",
      end: "+=800"
    }
  })

  mm.add("(min-width: 768px)", () => {
    tl.to(obj, {
      num: 1,
      duration: 1,
      onUpdate: async function () {
        window.requestAnimationFrame(() => updateDiagram(ctxArray[0], stepsDiagramCanvasArray[0], colors[0], angleDeltaArray[0]))
      }
    })
  })
}

