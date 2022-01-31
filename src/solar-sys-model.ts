const sun = new Image()
const moon = new Image()
const earth = new Image()

export function solarSysModel(ctx: CanvasRenderingContext2D) {
  loadImages()
    .then(() => {
      window.requestAnimationFrame(() => drawImage(ctx))
    })
    .catch(() => {
      console.error('error loading images')
    })
}

async function loadImages() {
  sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png'
  moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png'
  earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png'
  return await Promise.all(
    [sun, moon, earth].map((img) => {
      return new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject()
      })
    }),
  )
}

function drawImage(ctx: CanvasRenderingContext2D) {
  ctx.globalCompositeOperation = 'destination-over'
  ctx.clearRect(0, 0, 300, 300) // clear canvas

  const time = new Date()

  ctx.save()
  ctx.translate(150, 150)

  // loop
  ctx.save()
  ctx.strokeStyle = 'rgba(0,153,255,0.4)'
  ctx.beginPath()
  ctx.arc(0, 0, 105, 0, Math.PI * 2, false)
  ctx.closePath()
  ctx.stroke()
  ctx.restore()

  // earth
  ctx.save()
  ctx.fillStyle = 'rgba(0,0,0,0.4)'
  ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds())
  ctx.translate(105, 0)
  ctx.fillRect(0, -12, 50, 24) // Shadow
  ctx.drawImage(earth, -12, -12)
  // ctx.restore()

  // moon
  // ctx.save()
  ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds())
  // ctx.translate(105, 0)
  ctx.translate(0, 28.5)
  ctx.drawImage(moon, -3.5, -3.5)
  ctx.restore()

  // sun
  ctx.restore()
  ctx.drawImage(sun, 0, 0, 300, 300)

  window.requestAnimationFrame(() => drawImage(ctx))
}
