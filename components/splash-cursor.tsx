"use client"

import { useEffect, useRef } from "react"

export function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const config = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1024,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 1,
      VELOCITY_DISSIPATION: 0.2,
      PRESSURE: 0.8,
      PRESSURE_ITERATIONS: 20,
      CURL: 30,
      SPLAT_RADIUS: 0.25,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLOR_UPDATE_SPEED: 10,
      BACK_COLOR: { r: 0, g: 0, b: 0 },
      TRANSPARENT: true,
    }

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")
    if (!gl) return

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Shader programs
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(
      vertexShader,
      `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `,
    )
    gl.compileShader(vertexShader)

    const displayShader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(
      displayShader,
      `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float intensity;
      void main () {
        vec3 C = texture2D(uTexture, vUv).rgb;
        float a = max(C.r, max(C.g, C.b));
        gl_FragColor = vec4(C, a) * intensity;
      }
    `,
    )
    gl.compileShader(displayShader)

    const displayProgram = gl.createProgram()!
    gl.attachShader(displayProgram, vertexShader)
    gl.attachShader(displayProgram, displayShader)
    gl.linkProgram(displayProgram)

    // Create buffers
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW)

    const pointers: Array<{
      id: number
      x: number
      y: number
      dx: number
      dy: number
      down: boolean
      moved: boolean
      color: [number, number, number]
    }> = []

    let lastColorChangeTime = Date.now()

    const updatePointerDownData = (pointer: (typeof pointers)[0], x: number, y: number) => {
      pointer.down = true
      pointer.moved = false
      pointer.x = x / canvas.width
      pointer.y = 1.0 - y / canvas.height
      pointer.dx = 0
      pointer.dy = 0

      // Update color periodically
      const now = Date.now()
      if (now - lastColorChangeTime > config.COLOR_UPDATE_SPEED) {
        pointer.color = [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5]
        lastColorChangeTime = now
      }
    }

    const updatePointerMoveData = (pointer: (typeof pointers)[0], x: number, y: number) => {
      pointer.moved = pointer.down
      pointer.dx = (x / canvas.width - pointer.x) * 5.0
      pointer.dy = (1.0 - y / canvas.height - pointer.y) * 5.0
      pointer.x = x / canvas.width
      pointer.y = 1.0 - y / canvas.height
    }

    const updatePointerUpData = (pointer: (typeof pointers)[0]) => {
      pointer.down = false
    }

    canvas.addEventListener("mousedown", (e) => {
      let pointer = pointers.find((p) => p.id === -1)
      if (!pointer) {
        pointer = {
          id: -1,
          x: 0,
          y: 0,
          dx: 0,
          dy: 0,
          down: false,
          moved: false,
          color: [Math.random(), Math.random(), Math.random()],
        }
        pointers.push(pointer)
      }
      updatePointerDownData(pointer, e.clientX, e.clientY)
    })

    canvas.addEventListener("mousemove", (e) => {
      const pointer = pointers.find((p) => p.id === -1)
      if (!pointer) {
        const newPointer = {
          id: -1,
          x: e.clientX / canvas.width,
          y: 1.0 - e.clientY / canvas.height,
          dx: 0,
          dy: 0,
          down: false,
          moved: false,
          color: [0.3, 0.6, 1.0] as [number, number, number],
        }
        pointers.push(newPointer)
        return
      }
      updatePointerMoveData(pointer, e.clientX, e.clientY)
    })

    canvas.addEventListener("mouseup", () => {
      const pointer = pointers.find((p) => p.id === -1)
      if (pointer) updatePointerUpData(pointer)
    })

    // Simple render loop
    const render = () => {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      // Draw simple gradient effect based on pointer movement
      pointers.forEach((pointer) => {
        if (pointer.moved) {
          const dx = pointer.dx
          const dy = pointer.dy
          const intensity = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.1, 1.0)

          gl.uniform1f(gl.getUniformLocation(displayProgram, "intensity"), intensity)
        }
      })

      requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
