import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Crown, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#fefcf7] via-[#f8f6f0] to-[#f7e7ce]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#d4af37]/15 to-[#d4af37]/25"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] rounded-full floating-luxury opacity-70 sparkle-effect"></div>
        <div
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-gradient-to-r from-[#b8860b] to-[#d4af37] rounded-full floating-luxury opacity-80"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-gradient-to-r from-[#d4af37] to-[#9a7c0a] rounded-full floating-luxury opacity-50"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-gradient-to-r from-[#f7e7ce] to-[#d4af37] rounded-full floating-luxury opacity-60"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/2 w-1.5 h-1.5 bg-gradient-to-r from-[#d4af37] to-[#b8860b] rounded-full floating-luxury opacity-90"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/6 right-1/2 w-3.5 h-3.5 bg-gradient-to-r from-[#9a7c0a] to-[#d4af37] rounded-full floating-luxury opacity-40"
          style={{ animationDelay: "5s" }}
        ></div>
      </div>

      <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 hidden xl:block">
        <div className="royal-glass p-6 lg:p-10 rounded-3xl premium-shadow hover:royal-glow transition-all duration-500 group">
          <div className="relative">
            <img
              src="/luxury-essential-oils-bottles-on-marble-surface.jpg"
              alt="Luxury Essential Oils"
              className="w-64 lg:w-80 h-80 lg:h-96 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -top-4 -right-4 royal-gradient-bg p-3 rounded-full premium-shadow">
              <Crown className="w-6 h-6 text-[#0f0f23]" />
            </div>
          </div>
        </div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-16 items-center min-h-screen py-20">
          {/* Text Content */}
          <div className="space-y-8 lg:space-y-12 text-center xl:text-left order-2 xl:order-1">
            <div className="space-y-6 lg:space-y-8">
              <div className="relative">
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight">
                  <span className="royal-gradient-text text-shadow-luxury">Orchard Elixir</span>
                </h1>
                <div className="absolute -top-4 -right-4 hidden lg:block">
                  <Star className="w-6 lg:w-8 h-6 lg:h-8 text-[#d4af37] opacity-60 animate-pulse" />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-[#0f0f23] opacity-90 font-serif tracking-wide">
                  Pure Luxury. <span className="royal-gradient-text">Royal Excellence.</span>
                </p>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#0f0f23]/70 max-w-2xl mx-auto xl:mx-0 text-pretty leading-relaxed font-light">
                  Discover our collection of cold-pressed essential oils and premium herbs, crafted with
                  <span className="royal-gradient-text font-medium"> Dubai-style opulence</span> for the discerning
                  wellness enthusiast.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center xl:justify-start items-center">
              <Button
                size="lg"
                className="premium-button text-[#0f0f23] text-lg lg:text-xl px-8 lg:px-12 py-6 lg:py-8 rounded-2xl font-semibold tracking-wide group min-w-[180px] lg:min-w-[200px] h-auto"
              >
                Shop Collection
                <ArrowRight className="ml-3 lg:ml-4 h-5 lg:h-6 w-5 lg:w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="royal-glass text-[#0f0f23] text-lg lg:text-xl px-8 lg:px-12 py-6 lg:py-8 rounded-2xl royal-border hover:royal-glow hover:scale-105 transition-all duration-300 font-semibold bg-transparent min-w-[180px] lg:min-w-[200px] h-auto group"
              >
                <Sparkles className="mr-3 lg:mr-4 h-5 lg:h-6 w-5 lg:w-6 group-hover:rotate-12 transition-transform duration-300" />
                Our Story
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 pt-12 lg:pt-16 max-w-2xl mx-auto xl:mx-0">
              <div className="luxury-card p-6 lg:p-8 rounded-3xl text-center group cursor-pointer">
                <div className="text-3xl lg:text-4xl font-bold royal-gradient-text font-serif mb-3 group-hover:scale-110 transition-transform duration-300">
                  100%
                </div>
                <div className="text-sm lg:text-base text-[#0f0f23]/70 font-medium tracking-wide">Pure & Natural</div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] mx-auto mt-3 group-hover:w-16 transition-all duration-300"></div>
              </div>
              <div className="luxury-card p-6 lg:p-8 rounded-3xl text-center group cursor-pointer">
                <div className="text-3xl lg:text-4xl font-bold royal-gradient-text font-serif mb-3 group-hover:scale-110 transition-transform duration-300">
                  50+
                </div>
                <div className="text-sm lg:text-base text-[#0f0f23]/70 font-medium tracking-wide">Premium Products</div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] mx-auto mt-3 group-hover:w-16 transition-all duration-300"></div>
              </div>
              <div className="luxury-card p-6 lg:p-8 rounded-3xl text-center group cursor-pointer">
                <div className="text-3xl lg:text-4xl font-bold royal-gradient-text font-serif mb-3 group-hover:scale-110 transition-transform duration-300">
                  10K+
                </div>
                <div className="text-sm lg:text-base text-[#0f0f23]/70 font-medium tracking-wide">Happy Customers</div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] mx-auto mt-3 group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>
          </div>

          <div className="order-1 xl:order-2 xl:hidden flex justify-center">
            <div className="royal-glass p-6 rounded-3xl premium-shadow">
              <img
                src="/luxury-essential-oils-bottles-on-marble-surface.jpg"
                alt="Luxury Essential Oils"
                className="w-64 sm:w-80 h-64 sm:h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
