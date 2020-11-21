export class Hill {
  constructor(color, speed, total) {
    this.color = color
    this.speed = speed
    this.total = total
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth
    this.stageHeight = stageHeight

    this.points = []
    this.gap = Math.ceil(this.stageWidth / (this.total - 2))

    for (let i = 0; i < this.total; i++) {
      const x = i * this.gap
      const y = this.getY()
      this.points.push({ x, y })
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.beginPath()

    let cur = this.points[0]
    let prev = cur

    let dots = []
    cur.x += this.speed

    if (cur.x > -this.gap) {
      //화면에 나오기 전에 포인트를 생성해서 배열에 넣는다. (맨앞쪽으로 추가)
      this.points.unshift({
        x: -(this.gap * 2),
        y: this.getY()
      })
    } else if (cur.x > this.stageWidth + this.gap) {
      //화면을 넘어가면 해당 포인트를 배열에서 제거한다.
      this.points.splice(-1)
    }

    ctx.moveTo(cur.x, cur.y)

    let prevCx = cur.x
    let prevCy = cur.y

    for (let i = 1; i < this.points.length; i++) {
      cur = this.points[i]
      cur.x += this.speed
      const cx = (prev.x + cur.x) / 2
      const cy = (prev.y + cur.y) / 2
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy)

      dots.push({
        x1: prevCx,
        y1: prevCy,
        x2: prev.x,
        y2: prev.y,
        x3: cx,
        y3: cy,
      })

      prev = cur
      prevCx = cx
      prevCy = cy
    }

    ctx.lineTo(prev.x, prev.y)
    ctx.lineTo(this.stageWidth, this.stageHeight)
    ctx.lineTo(this.points[0].x, this.stageHeight)
    ctx.fill()

    return dots
  }

  getY() {
    const min = this.stageHeight / 8
    const max = this.stageHeight - min
    return min + Math.random() * max
  }
}