"use client"

import { useEffect, useRef, useState } from "react"

interface BlurTextProps {
  text: string
  delay?: number
  animateBy?: "words" | "characters"
  direction?: "top" | "bottom" | "left" | "right"
  onAnimationComplete?: () => void
  className?: string
}

export default function BlurText({
  text,
  delay = 150,
  animateBy = "words",
  direction = "top",
  onAnimationComplete,
  className = "",
}: BlurTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const segments = animateBy === "words" ? text.split(" ") : text.split("")

  useEffect(() => {
    if (isVisible && onAnimationComplete) {
      const totalDelay = segments.length * delay
      const timer = setTimeout(onAnimationComplete, totalDelay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, segments.length, delay, onAnimationComplete])

  const getTransform = () => {
    switch (direction) {
      case "top":
        return "translateY(-20px)"
      case "bottom":
        return "translateY(20px)"
      case "left":
        return "translateX(-20px)"
      case "right":
        return "translateX(20px)"
      default:
        return "translateY(-20px)"
    }
  }

  return (
    <div ref={ref} className={className}>
      {segments.map((segment, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            filter: isVisible ? "blur(0px)" : "blur(10px)",
            transform: isVisible ? "translate(0)" : getTransform(),
            transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && index < segments.length - 1 && " "}
        </span>
      ))}
    </div>
  )
}
