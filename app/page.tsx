"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Video, Newspaper, SearchIcon, Briefcase, Wallet } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import BlurText from "@/components/blur-text"
import { SplashCursor } from "@/components/splash-cursor"
import PartnersCarousel from "@/components/partners-carousel"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
        <SplashCursor />

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 transition-transform duration-75"
          style={{
            backgroundImage: "url('https://i.ibb.co/ympd0WfW/3e48809b-a74b-4eee-9261-67b079ded9b5.png')",
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002})`,
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background transition-opacity duration-75"
          style={{
            opacity: Math.max(0.5, 1 - scrollY * 0.001),
          }}
        />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="mx-auto max-w-6xl text-center transition-transform duration-75"
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002),
            }}
          >
            <BlurText
              text="THE NEXT GENERATION WEB3 ECOSYSTEM"
              delay={150}
              animateBy="words"
              direction="top"
              className="mb-4 text-6xl font-black leading-[0.95] tracking-wider text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
            />

            <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              Build, trade, and govern the future of decentralized finance. Access a complete suite of products designed
              for the next generation of crypto users and builders.
            </p>

            <Button
              size="lg"
              className="h-12 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Explore Ecosystem
            </Button>
          </div>

          <div
            className="relative mt-16 overflow-hidden border-y border-border/40 bg-card/30 py-4 transition-transform duration-75"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <div className="flex animate-marquee whitespace-nowrap">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center gap-8 px-8">
                  <span className="text-2xl font-bold text-primary">⛶</span>
                  <span className="text-lg font-semibold text-foreground">
                    Market • Meet • News • Search • Work • Pay
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 sm:py-28 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="mb-8 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              <span className="bg-gradient-to-r from-primary/20 to-primary/10 px-4 py-2 rounded-lg">
                Trusted By Leading Publications
              </span>
            </h2>
            <p className="mx-auto max-w-4xl text-lg sm:text-xl text-muted-foreground mb-16">
              <span className="bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-1 rounded">
                Viainti has been recognised and covered by top-tier media outlets and financial platforms showcasing our
                impact worldwide.
              </span>
            </p>

            {/* Publication Logos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group rounded-2xl border border-border/40 bg-card/30 p-8 transition-all hover:border-primary/30 hover:bg-card/50 flex items-center justify-center min-h-[140px]">
                <span className="text-3xl font-bold text-foreground">Forbes</span>
              </div>
              <div className="group rounded-2xl border border-border/40 bg-card/30 p-8 transition-all hover:border-primary/30 hover:bg-card/50 flex items-center justify-center min-h-[140px]">
                <span className="text-3xl font-bold text-foreground">CoinDesk</span>
              </div>
              <div className="group rounded-2xl border border-border/40 bg-card/30 p-8 transition-all hover:border-primary/30 hover:bg-card/50 flex items-center justify-center min-h-[140px]">
                <span className="text-3xl font-bold text-foreground">Bloomberg</span>
              </div>
              <div className="group rounded-2xl border border-border/40 bg-card/30 p-8 transition-all hover:border-primary/30 hover:bg-card/50 flex items-center justify-center min-h-[140px]">
                <span className="text-3xl font-bold text-foreground">TechCrunch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Ecosystem - Product Cards */}
      <section
        className="py-20 sm:py-28 relative"
        style={{
          background: "radial-gradient(54% 79.6% at 50% 100%, #0ea5e999 0%, #0000 100%)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm mb-4">
                <span className="text-xs font-medium uppercase tracking-widest text-primary">Our Ecosystem</span>
              </div>
              <p className="text-lg text-muted-foreground">
                <span className="font-semibold text-foreground">6 products live.</span> Expanding to{" "}
                <span className="font-bold text-primary">80+ products</span> in the ecosystem.
              </p>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {/* Market Card */}
              <a
                href="https://market.viainti.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card/50 to-card/30 p-8 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm">
                  <TrendingUp className="h-10 w-10 text-primary" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Market</h3>
                <p className="text-sm text-muted-foreground">Trade crypto in real-time with advanced analytics</p>
              </a>

              {/* Meet Card */}
              <a
                href="https://meet.viainti.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card/50 to-card/30 p-8 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm">
                  <Video className="h-10 w-10 text-primary" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Meet</h3>
                <p className="text-sm text-muted-foreground">Secure video conferencing for Web3 teams</p>
              </a>

              {/* News Card */}
              <a
                href="https://news.viainti.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card/50 to-card/30 p-8 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm">
                  <Newspaper className="h-10 w-10 text-primary" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">News</h3>
                <p className="text-sm text-muted-foreground">Stay updated with curated crypto news</p>
              </a>

              {/* Search Card */}
              <a
                href="https://search.viainti.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card/50 to-card/30 p-8 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm">
                  <SearchIcon className="h-10 w-10 text-primary" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Search</h3>
                <p className="text-sm text-muted-foreground">Explore blockchain data and transactions</p>
              </a>

              {/* Work Card */}
              <a
                href="https://work.viainti.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card/50 to-card/30 p-8 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm">
                  <Briefcase className="h-10 w-10 text-primary" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Work</h3>
                <p className="text-sm text-muted-foreground">Collaboration tools for distributed teams</p>
              </a>

              {/* Pay Card - Coming Soon */}
              <div className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card/50 to-card/30 p-8 opacity-60">
                <div className="absolute top-4 right-4">
                  <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                    Soon
                  </span>
                </div>
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm">
                  <Wallet className="h-10 w-10 text-primary" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Pay</h3>
                <p className="text-sm text-muted-foreground">Digital wallet and payment solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exchange Section */}

      {/* User Count Section */}
      {/* Added User Count Section */}

      {/* Virtual Wallet Section */}
      {/* Added Virtual Wallet Section */}

      {/* Statistics Section */}
      <section className="py-20 sm:py-28 border-t border-border/40 bg-gradient-to-b from-background to-card/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm mb-4">
                <span className="text-xs font-medium uppercase tracking-widest text-primary">By The Numbers</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Powering the Future of Web3
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of users building, trading, and collaborating in the Viainti ecosystem
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-card/50 to-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-5xl font-black text-primary mb-2">50K+</div>
                  <div className="text-sm font-medium text-muted-foreground">Active Users</div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-card/50 to-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-5xl font-black text-primary mb-2">$2.5B+</div>
                  <div className="text-sm font-medium text-muted-foreground">Total Volume</div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-card/50 to-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-5xl font-black text-primary mb-2">150+</div>
                  <div className="text-sm font-medium text-muted-foreground">Countries</div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-card/50 to-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-5xl font-black text-primary mb-2">99.9%</div>
                  <div className="text-sm font-medium text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card/5 to-background" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm mb-4">
                <span className="text-xs font-medium uppercase tracking-widest text-primary">How It Works</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Get Started in Minutes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to access the complete Web3 ecosystem
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative rounded-3xl border border-border/40 bg-card/30 backdrop-blur-sm p-8 transition-all hover:border-primary/40">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10">
                    <span className="text-3xl font-black text-primary">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Create Account</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sign up with your email or connect your wallet. Get instant access to all ecosystem products.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative rounded-3xl border border-border/40 bg-card/30 backdrop-blur-sm p-8 transition-all hover:border-primary/40">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10">
                    <span className="text-3xl font-black text-primary">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Choose Products</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Explore our suite of products. Trade on Market, collaborate on Work, or stay informed with News.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative rounded-3xl border border-border/40 bg-card/30 backdrop-blur-sm p-8 transition-all hover:border-primary/40">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10">
                    <span className="text-3xl font-black text-primary">3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Start Building</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Begin your Web3 journey. Trade, collaborate, and grow with the Viainti ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-28 border-t border-border/40 bg-gradient-to-b from-background to-card/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm mb-4">
                <span className="text-xs font-medium uppercase tracking-widest text-primary">Testimonials</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-4">
                Loved by Builders Worldwide
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See what our community has to say about the Viainti ecosystem
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-card/50 to-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">
                    "Viainti has completely transformed how I interact with Web3. The seamless integration between
                    products is incredible."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">SM</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Sarah Martinez</div>
                      <div className="text-sm text-muted-foreground">DeFi Trader</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-card/50 to-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">
                    "The best Web3 ecosystem I've used. Everything just works together perfectly. Highly recommend to
                    anyone serious about crypto."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">JC</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">James Chen</div>
                      <div className="text-sm text-muted-foreground">Blockchain Developer</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-card/50 to-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">
                    "Finally, a platform that understands what builders need. The tools are powerful yet intuitive. Game
                    changer!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">AP</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Alex Patel</div>
                      <div className="text-sm text-muted-foreground">DAO Founder</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%), linear-gradient(135deg, #0a0a0a, #1a1a1a)",
          }}
        />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm mb-6">
              <span className="text-xs font-medium uppercase tracking-widest text-primary">Join The Ecosystem</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
              Ready to Build the Future?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of builders, traders, and innovators shaping the next generation of Web3. Start your
              journey with Viainti today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="h-14 rounded-full bg-gradient-to-r from-primary to-primary/80 px-10 text-base font-semibold text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-2 border-primary/40 bg-transparent px-10 text-base font-semibold text-foreground hover:bg-primary/10 hover:border-primary transition-all"
              >
                Explore Products
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners and Advisors Section */}
      <section className="py-20 sm:py-28 border-t border-border/40 bg-gradient-to-b from-card/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm mb-6">
                <span className="text-xs font-medium uppercase tracking-widest text-primary">Partnerships</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
                Our Partners and Advisors
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Experience the power of collaboration as we forge ahead in innovation and growth, together with our
                valued partners who support the Viainti ecosystem.
              </p>
            </div>

            <PartnersCarousel />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/40 bg-gradient-to-b from-background via-card/10 to-background">
        {/* Newsletter Section */}
        <div className="border-b border-border/40 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 backdrop-blur-sm"></div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid gap-12 lg:grid-cols-5 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 blur-2xl rounded-full group-hover:blur-3xl transition-all" />
                  <img
                    src="/images/design-mode/logo-v(1).png"
                    alt="Viainti"
                    className="relative h-14 w-14 object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                <span className="text-4xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  viainti
                </span>
              </div>
              <p className="mb-8 max-w-sm text-base leading-relaxed text-muted-foreground">
                The next generation Web3 ecosystem. Six interconnected products designed to power your crypto
                journey—from trading to collaboration, all in one place.
              </p>

              {/* Contact Us Section */}
              <div className="mb-8 p-4 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Contact Us</p>
                <a
                  href="mailto:info@viainti.com"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
                >
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium group-hover:underline">info@viainti.com</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Join Our Community
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://x.com/i/communities/1976044075657855299"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/5 rounded-xl transition-all" />
                    <svg className="relative h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/5 rounded-xl transition-all" />
                    <svg className="relative h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/5 rounded-xl transition-all" />
                    <svg className="relative h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.052.052 0 0 0 .003-.041c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/5 rounded-xl transition-all" />
                    <svg className="relative h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Products Column */}
            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary" />
                Products
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://market.viainti.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Market
                  </a>
                </li>
                <li>
                  <a
                    href="https://meet.viainti.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Meet
                  </a>
                </li>
                <li>
                  <a
                    href="https://news.viainti.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    News
                  </a>
                </li>
                <li>
                  <a
                    href="https://search.viainti.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Search
                  </a>
                </li>
                <li>
                  <a
                    href="https://work.viainti.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Work
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">
                    Soon
                  </span>
                  <span className="text-sm text-muted-foreground/50">Pay</span>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary" />
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://whitepaper.viainti.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    White Paper
                  </a>
                </li>
                <li>
                  <a
                    href="https://solscan.io/token/7wTT5wGFRgY21okVnsDmp5hcGw2n8hL1wEAKjS5wpump"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Token
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/i/communities/1976044075657855299"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary" />
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Press Kit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between gap-6 border-t border-border/40 pt-8 sm:flex-row">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <p className="text-sm text-muted-foreground">© 2025 Viainti. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-primary font-medium">
                  Privacy
                </a>
                <span className="text-muted-foreground/30">•</span>
                <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-primary font-medium">
                  Terms
                </a>
                <span className="text-muted-foreground/30">•</span>
                <a href="#" className="text-xs text-muted-foreground transition-colors hover:text-primary font-medium">
                  Cookies
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="group flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary font-medium"
              >
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                All Systems Operational
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
