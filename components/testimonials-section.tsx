"use client"

import { useState } from "react"
import { Card, CardContent } from "@/ui/card"
import { Button } from "@/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "London, UK",
    rating: 5,
    text: "The lavender oil from Orchard Elixir has completely transformed my evening routine. The quality is exceptional and the scent is absolutely divine.",
    product: "Lavender Essential Oil",
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    text: "I've been using the Royal Relaxation Blend for months now. It's become an essential part of my wellness routine. Highly recommend!",
    product: "Royal Relaxation Blend",
  },
  {
    name: "Emma Thompson",
    location: "Paris, France",
    rating: 5,
    text: "The rose essential oil is pure luxury. A little goes a long way and the fragrance is absolutely beautiful. Worth every penny.",
    product: "Rose Essential Oil",
  },
  {
    name: "Raj Patel",
    location: "Delhi, India",
    rating: 5,
    text: "The ashwagandha powder has helped me manage stress so much better. The quality is outstanding and shipping was very fast.",
    product: "Premium Ashwagandha Root",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-background flex flex-col items-center justify-center">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join thousands of satisfied customers who have transformed their wellness journey with our premium products.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < testimonials[currentIndex].rating ? "fill-primary text-primary" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-balance leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                <div className="space-y-2">
                  <div className="font-semibold text-lg">{testimonials[currentIndex].name}</div>
                  <div className="text-muted-foreground">{testimonials[currentIndex].location}</div>
                  <div className="text-sm text-primary font-medium">
                    Verified purchase: {testimonials[currentIndex].product}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
