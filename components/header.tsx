"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { CartSheet } from "@/components/cart-sheet";
import { UserMenu } from "@/components/user-menu";
import { Menu, Search, ShoppingCart, Heart, Crown, Star } from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/ui/command";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full royal-glass border-b border-[#d4af37]/30 backdrop-blur-xl">
        <div className="container flex h-24 items-center justify-between px-4">
          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="h-12 w-12 rounded-full royal-gradient-bg flex items-center justify-center premium-shadow transition-all duration-300 group-hover:scale-110">
                <Crown className="h-7 w-7 text-[#0f0f23]" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Star className="w-4 h-4 text-[#d4af37] opacity-70 animate-pulse" />
              </div>
            </div>
            <span className="font-serif text-3xl font-bold royal-gradient-text tracking-wide">
              Orchard Elixir
            </span>
          </Link>

          {/* NAVIGATION */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link
              href="/products"
              className="nav-link hover:text-[#d4af37] transition-all duration-300 group py-3 tracking-wide"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="nav-link hover:text-[#d4af37] transition-all duration-300 group py-3 tracking-wide"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="nav-link hover:text-[#d4af37] transition-all duration-300 group py-3 tracking-wide"
            >
              Contact
            </Link>
          </nav>

          {/* RIGHT SIDE ICONS */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Currency Selector */}
            <div className="royal-glass rounded-full px-6 py-3 border border-[#d4af37]/30 premium-shadow">
              <select className="bg-transparent text-[#0f0f23] text-sm font-semibold focus:outline-none cursor-pointer tracking-wide">
                <option value="eur">EUR €</option>
                <option value="inr">INR ₹</option>
              </select>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="royal-glass rounded-full w-14 h-14 transition-all duration-300 group hover:bg-[#222] hover:scale-110"
            >
              <Search className="h-6 w-6 text-[#d4af37]" />
            </Button>
            {/* Cart */}{" "}
            <CartSheet>
              <Button
                variant="ghost"
                size="icon"
                className="royal-glass rounded-full w-14 h-14 hover:bg-[#222] hover:scale-110 transition-all duration-300 group relative"
              >
                <ShoppingCart className="h-6 w-6 text-[#d4af37]" />
              </Button>
            </CartSheet>
            <UserMenu />
          </div>

          {/* MOBILE MENU */}
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
            <SheetContent
              side="right"
              className="w-80 royal-glass border-l border-[#d4af37]/30"
            >
              <div className="flex flex-col space-y-8 mt-8">
                <div className="flex items-center space-x-4 pb-8 border-b border-[#d4af37]/30">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full royal-gradient-bg flex items-center justify-center premium-shadow">
                      <Crown className="h-6 w-6 text-[#0f0f23]" />
                    </div>
                    <Star className="absolute -top-1 -right-1 w-3 h-3 text-[#d4af37] opacity-70" />
                  </div>
                  <span className="font-serif text-2xl font-bold royal-gradient-text">
                    Orchard Elixir
                  </span>
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
                    {/* <Button
                      variant="ghost"
                      size="icon"
                      className="royal-glass rounded-full w-12 h-12 hover:royal-glow transition-all duration-300"
                    >
                      <Search className="h-5 w-5 text-[#d4af37]" />
                    </Button> */}
                    <div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="royal-glass rounded-full w-12 h-12 hover:royal-glow transition-all duration-300"
                        onClick={() => setSearchOpen(true)}
                      >
                        <Search className="h-5 w-5 text-[#d4af37]" />
                      </Button>

                      {searchOpen && (
                        <input
                          type="text"
                          className="block w-full mt-2 p-2 border rounded"
                          placeholder="Search..."
                          autoFocus
                        />
                      )}
                    </div>
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
              {/* mobile nav content */}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* SHADCN SEARCH DIALOG */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search products, categories, or wellness..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Popular Searches">
            <CommandItem>
              <Link href="/products/royal-apple-juice">Royal Apple Juice</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/products/pure-honey">Pure Honey</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/wellness">Wellness Products</Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
