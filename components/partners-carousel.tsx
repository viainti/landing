"use client"

import { useEffect, useRef } from "react"

const partners = [
  {
    name: "Chainlink",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
  },
  {
    name: "Polygon",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
  },
  {
    name: "Solana",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
  },
  {
    name: "Avalanche",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
  },
  {
    name: "Arbitrum",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/11841.png",
  },
  {
    name: "Optimism",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/11840.png",
  },
  {
    name: "The Graph",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/6719.png",
  },
  {
    name: "Uniswap",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png",
  },
]

export default function PartnersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollPosition = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      scrollPosition += scrollSpeed
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
    }

    const intervalId = setInterval(scroll, 20)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container */}
      <div ref={scrollRef} className="flex gap-12 overflow-x-hidden py-8" style={{ scrollBehavior: "auto" }}>
        {/* Duplicate partners array for infinite scroll effect */}
        {[...partners, ...partners, ...partners].map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="group relative flex-shrink-0 rounded-2xl border border-border/40 bg-gradient-to-br from-card/50 to-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            style={{ minWidth: "280px", height: "160px" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative flex items-center justify-center h-full">
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
