"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartSheet } from "@/components/cart-sheet"
import { UserMenu } from "@/components/user-menu"
import { Menu, Search, ShoppingCart, Heart, Crown, Star } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full royal-glass border-b border-[#d4af37]/30 backdrop-blur-xl">
      <div className="container flex h-24 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-4 group">
          <div className="relative">
            <div className="h-12 w-12 rounded-full royal-gradient-bg flex items-center justify-center premium-shadow group-hover:royal-glow transition-all duration-300 group-hover:scale-110">
              <Crown className="h-7 w-7 text-[#0f0f23]" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Star className="w-4 h-4 text-[#d4af37] opacity-70 animate-pulse" />
            </div>
          </div>
          <span className="font-serif text-3xl font-bold royal-gradient-text tracking-wide">Orchard Elixir</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-12">
          <Link
            href="/products"
            className="relative text-[#0f0f23] font-semibold text-lg hover:text-[#d4af37] transition-all duration-300 group py-3 tracking-wide"
          >
            Products
            <span className="absolute bottom-0 left-0 w-0 h-1 royal-gradient-bg group-hover:w-full transition-all duration-300 rounded-full"></span>
            <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
          <Link
            href="/categories"
            className="relative text-[#0f0f23] font-semibold text-lg hover:text-[#d4af37] transition-all duration-300 group py-3 tracking-wide"
          >
            Categories
            <span className="absolute bottom-0 left-0 w-0 h-1 royal-gradient-bg group-hover:w-full transition-all duration-300 rounded-full"></span>
            <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
          <Link
            href="/about"
            className="relative text-[#0f0f23] font-semibold text-lg hover:text-[#d4af37] transition-all duration-300 group py-3 tracking-wide"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-1 royal-gradient-bg group-hover:w-full transition-all duration-300 rounded-full"></span>
            <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
          <Link
            href="/wellness"
            className="relative text-[#0f0f23] font-semibold text-lg hover:text-[#d4af37] transition-all duration-300 group py-3 tracking-wide"
          >
            Wellness
            <span className="absolute bottom-0 left-0 w-0 h-1 royal-gradient-bg group-hover:w-full transition-all duration-300 rounded-full"></span>
            <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
          <Link
            href="/contact"
            className="relative text-[#0f0f23] font-semibold text-lg hover:text-[#d4af37] transition-all duration-300 group py-3 tracking-wide"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-1 royal-gradient-bg group-hover:w-full transition-all duration-300 rounded-full"></span>
            <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <div className="royal-glass rounded-full px-6 py-3 border border-[#d4af37]/30 premium-shadow">
            <select className="bg-transparent text-[#0f0f23] text-sm font-semibold focus:outline-none cursor-pointer tracking-wide">
              <option value="eur">EUR €</option>
              <option value="inr">INR ₹</option>
            </select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="royal-glass rounded-full w-14 h-14 hover:royal-glow hover:scale-110 transition-all duration-300 group"
          >
            <Search className="h-6 w-6 text-[#d4af37] group-hover:scale-110 transition-transform duration-300" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="royal-glass rounded-full w-14 h-14 hover:royal-glow hover:scale-110 transition-all duration-300 group relative"
          >
            <Heart className="h-6 w-6 text-[#d4af37] group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
          <CartSheet>
            <Button
              variant="ghost"
              size="icon"
              className="royal-glass rounded-full w-14 h-14 hover:royal-glow hover:scale-110 transition-all duration-300 group relative"
            >
              <ShoppingCart className="h-6 w-6 text-[#d4af37] group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#d4af37] to-[#f7e7ce] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </CartSheet>
          <UserMenu />
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="royal-glass rounded-full w-14 h-14 hover:royal-glow hover:scale-110 transition-all duration-300"
            >
              <Menu className="h-6 w-6 text-[#d4af37]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 royal-glass border-l border-[#d4af37]/30">
            <div className="flex flex-col space-y-8 mt-8">
              <div className="flex items-center space-x-4 pb-8 border-b border-[#d4af37]/30">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full royal-gradient-bg flex items-center justify-center premium-shadow">
                    <Crown className="h-6 w-6 text-[#0f0f23]" />
                  </div>
                  <Star className="absolute -top-1 -right-1 w-3 h-3 text-[#d4af37] opacity-70" />
                </div>
                <span className="font-serif text-2xl font-bold royal-gradient-text">Orchard Elixir</span>
              </div>

              <Link
                href="/products"
                className="text-xl font-semibold text-[#0f0f23] hover:text-[#d4af37] transition-colors duration-300 tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="text-xl font-semibold text-[#0f0f23] hover:text-[#d4af37] transition-colors duration-300 tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="text-xl font-semibold text-[#0f0f23] hover:text-[#d4af37] transition-colors duration-300 tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/wellness"
                className="text-xl font-semibold text-[#0f0f23] hover:text-[#d4af37] transition-colors duration-300 tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                Wellness
              </Link>
              <Link
                href="/contact"
                className="text-xl font-semibold text-[#0f0f23] hover:text-[#d4af37] transition-colors duration-300 tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <div className="flex items-center justify-between pt-8 border-t border-[#d4af37]/30">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="royal-glass rounded-full w-12 h-12 hover:royal-glow transition-all duration-300"
                  >
                    <Search className="h-5 w-5 text-[#d4af37]" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="royal-glass rounded-full w-12 h-12 hover:royal-glow transition-all duration-300"
                  >
                    <Heart className="h-5 w-5 text-[#d4af37]" />
                  </Button>
                  <CartSheet>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="royal-glass rounded-full w-12 h-12 hover:royal-glow transition-all duration-300"
                    >
                      <ShoppingCart className="h-5 w-5 text-[#d4af37]" />
                    </Button>
                  </CartSheet>
                </div>
                <UserMenu />
              </div>

              <div className="royal-glass rounded-3xl p-6 border border-[#d4af37]/30 premium-shadow">
                <label className="text-sm font-semibold text-[#0f0f23] block mb-3 tracking-wide">
                  Currency Selection
                </label>
                <select className="w-full bg-transparent text-[#0f0f23] font-semibold text-lg focus:outline-none cursor-pointer">
                  <option value="eur">EUR (€)</option>
                  <option value="inr">INR (₹)</option>
                </select>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
