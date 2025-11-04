import { Button } from "@/components/ui/button"
import {
  Menu,
  ChevronDown,
  ShoppingCart,
  Video,
  Briefcase,
  Newspaper,
  Search,
  FileText,
  Coins,
  Wallet,
} from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IoEnterOutline } from "react-icons/io5";


const countries = [
  {
    code: "USA",
    name: "United States",
    flag: (
      <svg width="20" height="20" viewBox="0 0 20 20" className="rounded-full overflow-hidden">
        <circle cx="10" cy="10" r="10" fill="#B22234" />
        <rect x="0" y="0" width="20" height="1.54" fill="#B22234" />
        <rect x="0" y="1.54" width="20" height="1.54" fill="white" />
        <rect x="0" y="3.08" width="20" height="1.54" fill="#B22234" />
        <rect x="0" y="4.62" width="20" height="1.54" fill="white" />
        <rect x="0" y="6.16" width="20" height="1.54" fill="#B22234" />
        <rect x="0" y="7.7" width="20" height="1.54" fill="white" />
        <rect x="0" y="9.24" width="20" height="1.54" fill="#B22234" />
        <rect x="0" y="10.78" width="20" height="1.54" fill="white" />
        <rect x="0" y="12.32" width="20" height="1.54" fill="#B22234" />
        <rect x="0" y="13.86" width="20" height="1.54" fill="white" />
        <rect x="0" y="15.4" width="20" height="1.54" fill="#B22234" />
        <rect x="0" y="16.94" width="20" height="1.54" fill="white" />
        <rect x="0" y="18.48" width="20" height="1.54" fill="#B22234" />
        <rect x="0" y="0" width="8" height="10.78" fill="#3C3B6E" />
      </svg>
    ),
  },
  {
    code: "UK",
    name: "United Kingdom",
    flag: (
      <svg width="20" height="20" viewBox="0 0 20 20" className="rounded-full overflow-hidden">
        <circle cx="10" cy="10" r="10" fill="#012169" />
        <path d="M0 0L20 20M20 0L0 20" stroke="white" strokeWidth="3" />
        <path d="M0 0L20 20M20 0L0 20" stroke="#C8102E" strokeWidth="2" />
        <path d="M10 0V20M0 10H20" stroke="white" strokeWidth="5" />
        <path d="M10 0V20M0 10H20" stroke="#C8102E" strokeWidth="3" />
      </svg>
    ),
  },
  {
    code: "ESP",
    name: "Spain",
    flag: (
      <svg width="20" height="20" viewBox="0 0 20 20" className="rounded-full overflow-hidden">
        <circle cx="10" cy="10" r="10" fill="#AA151B" />
        <rect x="0" y="5" width="20" height="10" fill="#F1BF00" />
        <rect x="0" y="0" width="20" height="5" fill="#AA151B" />
        <rect x="0" y="15" width="20" height="5" fill="#AA151B" />
      </svg>
    ),
  },
  {
    code: "ARG",
    name: "Argentina",
    flag: (
      <svg width="20" height="20" viewBox="0 0 20 20" className="rounded-full overflow-hidden">
        <circle cx="10" cy="10" r="10" fill="#74ACDF" />
        <rect x="0" y="0" width="20" height="6.67" fill="#74ACDF" />
        <rect x="0" y="6.67" width="20" height="6.67" fill="white" />
        <rect x="0" y="13.33" width="20" height="6.67" fill="#74ACDF" />
        <circle cx="10" cy="10" r="2" fill="#F6B40E" stroke="#85340A" strokeWidth="0.3" />
      </svg>
    ),
  },
  {
    code: "MEX",
    name: "Mexico",
    flag: (
      <svg width="20" height="20" viewBox="0 0 20 20" className="rounded-full overflow-hidden">
        <circle cx="10" cy="10" r="10" fill="white" />
        <rect x="0" y="0" width="6.67" height="20" fill="#006847" />
        <rect x="6.67" y="0" width="6.67" height="20" fill="white" />
        <rect x="13.33" y="0" width="6.67" height="20" fill="#CE1126" />
      </svg>
    ),
  },
  {
    code: "BRA",
    name: "Brazil",
    flag: (
      <svg width="20" height="20" viewBox="0 0 20 20" className="rounded-full overflow-hidden">
        <circle cx="10" cy="10" r="10" fill="#009B3A" />
        <path d="M10 3L17 10L10 17L3 10Z" fill="#FEDF00" />
        <circle cx="10" cy="10" r="3" fill="#002776" />
      </svg>
    ),
  },
]

export function Header() {
  return (
    <header className="fixed top-3 left-3 right-3 z-50 mx-auto max-w-[1400px]">
      <div className="rounded-full border border-white/10 bg-black/70 backdrop-blur-xl px-5 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/design-mode/logo-v.png"
                alt="Viainti"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-lg font-light tracking-wide text-white">viainti</span>
            </div>

            <nav className="hidden items-center gap-6 lg:flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white">
                    Products
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-black/95 border-white/10 backdrop-blur-xl p-2">
                  <DropdownMenuItem
                    asChild
                    className="hover:bg-white/10 focus:bg-white/10 cursor-pointer rounded-lg p-3"
                  >
                    <a
                      href="https://market.viainti.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <ShoppingCart className="h-5 w-5 text-white" />
                      <div className="flex flex-col">
                        <span className="text-white font-medium">Market</span>
                        <span className="text-xs text-white/60">Trade & Exchange</span>
                      </div>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="hover:bg-white/10 focus:bg-white/10 cursor-pointer rounded-lg p-3"
                  >
                    <a
                      href="https://meet.viainti.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <Video className="h-5 w-5 text-white" />
                      <div className="flex flex-col">
                        <span className="text-white font-medium">Meet</span>
                        <span className="text-xs text-white/60">Video Conferencing</span>
                      </div>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="hover:bg-white/10 focus:bg-white/10 cursor-pointer rounded-lg p-3"
                  >
                    <a
                      href="https://work.viainti.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <Briefcase className="h-5 w-5 text-white" />
                      <div className="flex flex-col">
                        <span className="text-white font-medium">Work</span>
                        <span className="text-xs text-white/60">Collaboration Tools</span>
                      </div>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="hover:bg-white/10 focus:bg-white/10 cursor-pointer rounded-lg p-3"
                  >
                    <a
                      href="https://news.viainti.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <Newspaper className="h-5 w-5 text-white" />
                      <div className="flex flex-col">
                        <span className="text-white font-medium">News</span>
                        <span className="text-xs text-white/60">Latest Updates</span>
                      </div>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="hover:bg-white/10 focus:bg-white/10 cursor-pointer rounded-lg p-3"
                  >
                    <a
                      href="https://search.viainti.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <Search className="h-5 w-5 text-white" />
                      <div className="flex flex-col">
                        <span className="text-white font-medium">Search</span>
                        <span className="text-xs text-white/60">Discover Content</span>
                      </div>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="opacity-60 cursor-not-allowed rounded-lg p-3" disabled>
                    <div className="flex items-center gap-3 w-full">
                      <Wallet className="h-5 w-5 text-white" />
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">Pay</span>
                          <span className="text-xs text-orange-500 font-semibold bg-orange-500/20 px-2 py-0.5 rounded-full">
                            Soon
                          </span>
                        </div>
                        <span className="text-xs text-white/60">Payment Solutions</span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <a
                href="https://x.com/i/communities/1976044075657855299"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Community
              </a>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white">
                    Learn
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-black/95 border-white/10 backdrop-blur-xl p-2">
                  <DropdownMenuItem
                    asChild
                    className="hover:bg-white/10 focus:bg-white/10 cursor-pointer rounded-lg p-3"
                  >
                    <a
                      href="https://whitepaper.viainti.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <FileText className="h-5 w-5 text-white" />
                      <div className="flex flex-col">
                        <span className="text-white font-medium">White Paper</span>
                        <span className="text-xs text-white/60">Technical Documentation</span>
                      </div>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="hover:bg-white/10 focus:bg-white/10 cursor-pointer rounded-lg p-3"
                  >
                    <a
                      href="https://solscan.io/token/7wTT5wGFRgY21okVnsDmp5hcGw2n8hL1wEAKjS5wpump"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <Coins className="h-5 w-5 text-white" />
                      <div className="flex flex-col">
                        <span className="text-white font-medium">Token</span>
                        <span className="text-xs text-white/60">View on Solscan</span>
                      </div>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <a href="#" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                Governance
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 md:flex">
                  {countries[0].flag}
                  {countries[0].code}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-black/95 border-white/10 backdrop-blur-xl">
                {countries.map((country) => (
                  <DropdownMenuItem
                    key={country.code}
                    className="flex items-center gap-3 text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                  >
                    {country.flag}
                    <span>{country.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="hidden md:flex rounded-full bg-indigo-800 hover:bg-indigo-900 text-white font-medium px-5 py-2 h-9 text-sm">
             <div className="is-icon-mn">
              <IoEnterOutline />
             </div>
              Access Ecosystem
            </Button>

            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
