import Link from "next/link";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden flex flex-col items-center justify-center">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]"></div>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="container px-4 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full royal-gradient-bg flex items-center justify-center">
                <span className="text-[#0f0f23] font-bold text-lg">O</span>
              </div>
              <span className="text-2xl font-bold font-serif royal-gradient-text">
                Orchard Elixir
              </span>
            </div>
            <p className="text-[#f8f6f0]/80 text-pretty leading-relaxed responsive-text-sm">
              Premium cold-pressed essential oils and herbs for the discerning
              wellness enthusiast. Crafted with luxury and purity in mind.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="glass-button text-[#d4af37] hover:text-[#0f0f23] h-12 w-12 rounded-full"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-button text-[#d4af37] hover:text-[#0f0f23] h-12 w-12 rounded-full"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-button text-[#d4af37] hover:text-[#0f0f23] h-12 w-12 rounded-full"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="responsive-text-lg font-semibold font-serif royal-gradient-text">
              Quick Links
            </h3>
            <div className="space-y-3">
              <Link
                href="/products"
                className="block text-[#f8f6f0]/80 hover:text-[#d4af37] transition-all duration-300 responsive-text-sm hover:translate-x-1"
              >
                All Products
              </Link>
              <Link
                href="/essential-oils"
                className="block text-[#f8f6f0]/80 hover:text-[#d4af37] transition-all duration-300 responsive-text-sm hover:translate-x-1"
              >
                Essential Oils
              </Link>
              <Link
                href="/herbs"
                className="block text-[#f8f6f0]/80 hover:text-[#d4af37] transition-all duration-300 responsive-text-sm hover:translate-x-1"
              >
                Premium Herbs
              </Link>
              <Link
                href="/blends"
                className="block text-[#f8f6f0]/80 hover:text-[#d4af37] transition-all duration-300 responsive-text-sm hover:translate-x-1"
              >
                Signature Blends
              </Link>
              <Link
                href="/wellness"
                className="block text-[#f8f6f0]/80 hover:text-[#d4af37] transition-all duration-300 responsive-text-sm hover:translate-x-1"
              >
                Wellness Guide
              </Link>
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-6">
            <h3 className="responsive-text-lg font-semibold font-serif royal-gradient-text">
              Customer Care
            </h3>
            <div className="space-y-3">
              <Link
                href="/about"
                className="block text-[#f8f6f0]/80 hover:text-[#d4af37] transition-all duration-300 responsive-text-sm hover:translate-x-1"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-[#f8f6f0]/80 hover:text-[#d4af37] transition-all duration-300 responsive-text-sm hover:translate-x-1"
              >
                Contact
              </Link>
              <Link
                href="/shipping"
                className="block text-[#f8f6f0]/80 hover:text-[#d4af37] transition-all duration-300 responsive-text-sm hover:translate-x-1"
              >
                Shipping Info
              </Link>
              <Link
                href="/returns"
                className="block text-[#f8f6f0]/80 hover:text-[#d4af37] transition-all duration-300 responsive-text-sm hover:translate-x-1"
              >
                Returns
              </Link>
              <Link
                href="/faq"
                className="block text-[#f8f6f0]/80 hover:text-[#d4af37] transition-all duration-300 responsive-text-sm hover:translate-x-1"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <h3 className="responsive-text-lg font-semibold font-serif royal-gradient-text">
              Stay Connected
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-[#f8f6f0]/80">
                <Mail className="h-5 w-5 text-[#d4af37] flex-shrink-0" />
                <span className="responsive-text-sm break-all">
                  hello@orchardelixir.com
                </span>
              </div>
              <div className="flex items-center space-x-3 text-[#f8f6f0]/80">
                <Phone className="h-5 w-5 text-[#d4af37] flex-shrink-0" />
                <span className="responsive-text-sm">+44 20 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3 text-[#f8f6f0]/80">
                <MapPin className="h-5 w-5 text-[#d4af37] flex-shrink-0" />
                <span className="responsive-text-sm">London, UK</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="responsive-text-sm text-[#f8f6f0]/80 font-medium">
                Subscribe to our newsletter
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Your email"
                  className="flex-1 royal-glass text-[#f8f6f0] placeholder:text-[#f8f6f0]/60 border-[#d4af37]/30 focus:border-[#d4af37] bg-transparent"
                />
                <Button className="premium-button text-[#0f0f23] font-semibold px-6 py-2 whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#d4af37]/20 mt-12 lg:mt-16 pt-8 text-center">
          <p className="text-[#f8f6f0]/60 responsive-text-sm">
            © 2024 Orchard Elixir. All rights reserved. |
            <Link
              href="/privacy"
              className="hover:text-[#d4af37] transition-colors ml-1"
            >
              Privacy Policy
            </Link>{" "}
            |
            <Link
              href="/terms"
              className="hover:text-[#d4af37] transition-colors ml-1"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
