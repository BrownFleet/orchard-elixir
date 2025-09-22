"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Crown, Mail, Sparkles } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1a1a2e]"></div>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #debd68 2px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#debd68] rounded-full floating-animation opacity-60"></div>
        <div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#e2c479] rounded-full floating-animation opacity-80"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-[#dbb658] rounded-full floating-animation opacity-40"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Crown className="h-12 w-12 text-[#debd68] mb-4" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#faf8f3]">
              Join Our <span className="gold-gradient-text">Royal Family</span>
            </h2>
            <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full"></div>
          </div>

          <p className="text-xl text-[#faf8f3]/80 max-w-2xl mx-auto leading-relaxed">
            Be the first to discover our exclusive collections, receive luxury wellness tips, and enjoy member-only
            privileges fit for royalty.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#debd68]" />
                <Input
                  type="email"
                  placeholder="Enter your royal email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-morphism pl-12 pr-4 py-4 rounded-2xl border-2 border-[#debd68]/30 bg-[#faf8f3]/10 text-[#faf8f3] placeholder:text-[#faf8f3]/60 focus:border-[#debd68] focus:ring-[#debd68]/50 text-lg"
                  required
                />
              </div>
              <Button
                type="submit"
                className="gold-gradient-bg text-[#1a1a2e] font-semibold px-8 py-4 rounded-2xl luxury-shadow hover:luxury-glow hover:scale-105 transition-all duration-300 shimmer group text-lg"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Join Now
              </Button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="glass-morphism p-6 rounded-2xl border border-[#debd68]/20 hover:luxury-glow transition-all duration-300">
              <div className="text-[#debd68] text-2xl font-bold mb-2">✨</div>
              <h3 className="font-semibold text-[#faf8f3] mb-2">Exclusive Access</h3>
              <p className="text-[#faf8f3]/70 text-sm">First access to new collections and limited editions</p>
            </div>
            <div className="glass-morphism p-6 rounded-2xl border border-[#debd68]/20 hover:luxury-glow transition-all duration-300">
              <div className="text-[#debd68] text-2xl font-bold mb-2">👑</div>
              <h3 className="font-semibold text-[#faf8f3] mb-2">Royal Discounts</h3>
              <p className="text-[#faf8f3]/70 text-sm">Member-only pricing and special offers</p>
            </div>
            <div className="glass-morphism p-6 rounded-2xl border border-[#debd68]/20 hover:luxury-glow transition-all duration-300">
              <div className="text-[#debd68] text-2xl font-bold mb-2">🌿</div>
              <h3 className="font-semibold text-[#faf8f3] mb-2">Wellness Tips</h3>
              <p className="text-[#faf8f3]/70 text-sm">Expert guidance and luxury wellness insights</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
