"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, TrendingUp, Video, Newspaper, Search, Briefcase, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

const products = [
  {
    name: "Market",
    title: "Advanced Trading Platform",
    description:
      "Trade cryptocurrencies with real-time analytics, advanced charting tools, and professional-grade features for serious traders.",
    url: "https://market.viainti.com/",
    icon: TrendingUp,
    image: "/modern-cryptocurrency-trading-platform-dashboard-w.jpg",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Meet",
    title: "Secure Video Conferencing",
    description:
      "Connect with your team through encrypted video calls, screen sharing, and collaboration tools built for the decentralized future.",
    url: "https://meet.viainti.com/",
    icon: Video,
    image: "/modern-video-conferencing-interface-with-multiple-.jpg",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    name: "News",
    title: "Crypto News & Insights",
    description:
      "Stay informed with the latest cryptocurrency news, market analysis, and ecosystem developments from trusted sources.",
    url: "https://news.viainti.com/",
    icon: Newspaper,
    image: "/modern-news-platform-interface-with-articles-and-h.jpg",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    name: "Search",
    title: "Blockchain Search Engine",
    description:
      "Powerful search engine for blockchain data, transactions, smart contracts, and decentralized content across multiple networks.",
    url: "https://search.viainti.com/",
    icon: Search,
    image: "/modern-search-engine-interface-with-blockchain-dat.jpg",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    name: "Work",
    title: "Collaborative Workspace",
    description:
      "Project management and collaboration tools designed for distributed teams working in the Web3 ecosystem.",
    url: "https://work.viainti.com/",
    icon: Briefcase,
    image: "/modern-project-management-dashboard-with-tasks-and.jpg",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    name: "Pay",
    title: "Payment Solution",
    description:
      "Next-generation payment platform for seamless crypto and fiat transactions with instant settlements and low fees.",
    url: "#",
    icon: Wallet,
    image: "/modern-payment-app-interface-with-wallet-and-trans.jpg",
    gradient: "from-amber-500/20 to-orange-500/20",
    comingSoon: true,
  },
]

export default function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
    setIsAutoPlaying(false)
  }

  const currentProduct = products[currentIndex]
  const Icon = currentProduct.icon

  return (
    <div className="relative">
      {/* Main Slider */}
      <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/30">
        <div className="grid gap-0 lg:grid-cols-2">
          {/* Image Side */}
          <div
            className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${currentProduct.gradient} lg:aspect-auto`}
          >
            <img
              src={currentProduct.image || "/placeholder.svg"}
              alt={currentProduct.name}
              className="h-full w-full object-cover transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

            {currentProduct.comingSoon && (
              <div className="absolute right-6 top-6 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg">
                COMING SOON
              </div>
            )}
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
              <Icon className="h-8 w-8 text-primary" />
            </div>

            <div className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">{currentProduct.name}</div>

            <h3 className="mb-4 text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {currentProduct.title}
            </h3>

            <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {currentProduct.description}
            </p>

            {!currentProduct.comingSoon ? (
              <a href={currentProduct.url} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Explore {currentProduct.name}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            ) : (
              <Button size="lg" disabled className="h-12 rounded-full px-8 text-base font-semibold opacity-50">
                Coming Soon
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-border/40 bg-background/80 p-3 backdrop-blur-sm transition-all hover:bg-background hover:shadow-lg"
        aria-label="Previous product"
      >
        <ChevronLeft className="h-6 w-6 text-foreground" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-border/40 bg-background/80 p-3 backdrop-blur-sm transition-all hover:bg-background hover:shadow-lg"
        aria-label="Next product"
      >
        <ChevronRight className="h-6 w-6 text-foreground" />
      </button>

      {/* Dots Navigation */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {products.map((product, index) => (
          <button
            key={product.name}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentIndex
                ? "h-2 w-8 rounded-full bg-primary"
                : "h-2 w-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to ${product.name}`}
          />
        ))}
      </div>

      {/* Product Names Marquee */}
      <div className="mt-8 overflow-hidden rounded-full border border-border/40 bg-card/30 py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-6">
              <span className="text-sm font-semibold text-muted-foreground">
                Market • Meet • News • Search • Work • Pay
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
