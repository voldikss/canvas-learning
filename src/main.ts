import { solarSysModel } from './solar-sys-model'

export function main() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  if (!canvas.getContext) {
    return
  }

  canvas.width = window.CANVAS_WIDTH
  canvas.height =  window.CANVAS_HEIGHT

  const ctx = canvas.getContext('2d')
  solarSysModel(ctx)
}

main()
