const stepsDiagramCanvas = document.getElementById("steps__diagram-canvas")
stepsDiagramCanvas.width = 573
stepsDiagramCanvas.height = 573

const ctx = stepsDiagramCanvas.getContext("2d")

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

function animateDiagram (color, startAngle, endAngle) {
  drawPieSlice(
    ctx,
    Math.round(stepsDiagramCanvas.width/2),
    Math.round(stepsDiagramCanvas.height/2),
    Math.round(stepsDiagramCanvas.width/2)-1,
    startAngle,
    endAngle,
    color,
    color)
}


let start, previousTimeStamp;
let done = false;

function animInit () {
  let startAngle = 3*Math.PI/2
  let endAngle = 3*Math.PI/2 + 0.01
  let progress = 0
  window.requestAnimationFrame(step);
  function step(timeStamp) {
    if (start === undefined) {
      start = timeStamp;
    }
    if (previousTimeStamp !== timeStamp) {
      animateDiagram("#88bdd1", startAngle+0.6, endAngle+0.6, progress)
      animateDiagram("#67abc4", startAngle+0.3, endAngle+0.3, progress)
      animateDiagram("#3a90b0", startAngle, endAngle, progress)
      startAngle += 0.01
      endAngle += 0.01
      progress += 0.01
      if (progress >= 6) done = true;
    }
    previousTimeStamp = timeStamp;
    if (!done) {
      window.requestAnimationFrame(step);
    }
  }
}

animInit("")

