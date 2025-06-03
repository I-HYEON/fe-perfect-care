import { useEffect, useRef } from 'react'
import Zdog from 'zdog'

export function ZdogCharacter() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    let isSpinning = true

    const illo = new Zdog.Illustration({
      element: canvasRef.current,
      dragRotate: true,
      resize: true,
      zoom: 8,
      onDragStart: () => (isSpinning = false),
    })

    // 흰자 (계란 바깥 부분)
    new Zdog.Ellipse({
      addTo: illo,
      diameter: 20,
      stroke: 12,
      color: '#fffacd', // 연한 노란빛 흰자
    })

    // 노른자
    new Zdog.Ellipse({
      addTo: illo,
      diameter: 8,
      stroke: 8,
      translate: { z: 6 },
      color: '#fdd835', // 노란 노른자
    })

    // 눈
    const faceAnchor = new Zdog.Anchor({
      addTo: illo,
      translate: { z: 7 },
    })

    ;[-1.5, 1.5].forEach((x) => {
      new Zdog.Shape({
        addTo: faceAnchor,
        translate: { x, y: -1 },
        stroke: 1,
        color: '#333',
      })
    })

    // 입
    new Zdog.Shape({
      addTo: faceAnchor,
      path: [
        { x: -1, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 1 },
      ],
      closed: false,
      stroke: 1,
      color: '#e57373',
    })

    const animate = () => {
      if (isSpinning) illo.rotate.y += 0.03
      illo.updateRenderGraph()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="zdog-canvas" />
}
