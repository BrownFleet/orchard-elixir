import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Premium Walnut Oil",
    description: "Cold-pressed walnut oil with rich omega-3 fatty acids",
    price: { eur: 34.99, inr: 2979 },
    image: "/premium-walnut-oil-luxury-bottle.jpg",
    rating: 4.9,
    reviews: 127,
    featured: true,
  },
  {
    id: 2,
    name: "Kashmiri Saffron",
    description: "Authentic Kashmiri saffron threads of the highest grade",
    price: { eur: 89.99, inr: 7649 },
    image: "/kashmiri-saffron-luxury-jar.jpg",
    rating: 5.0,
    reviews: 89,
    featured: true,
  },
  {
    id: 3,
    name: "Cold-Pressed Sesame Oil",
    description: "Pure sesame oil with traditional cold-pressing methods",
    price: { eur: 24.99, inr: 2099 },
    image: "/sesame-oil-premium-bottle.jpg",
    rating: 4.8,
    reviews: 203,
    featured: true,
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f3] to-[#f5f2e8]"></div>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #debd68 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-6 mb-16 lg:mb-20">
          <div className="inline-block">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="royal-gradient-text text-shadow-luxury">Signature Collection</span>
            </h2>
            <div className="w-32 h-1 royal-gradient-bg mx-auto rounded-full mt-4"></div>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-[#1a1a2e]/70 max-w-3xl mx-auto text-pretty leading-relaxed">
            Discover our most treasured products, handpicked for their exceptional purity and transformative wellness
            properties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group luxury-card border-2 border-[#debd68]/20 rounded-3xl overflow-hidden hover:royal-glow hover:scale-105 hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={
                      product.image ||
                      `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(product.name + " luxury bottle") || "/placeholder.svg"}`
                    }
                    alt={product.name}
                    className="w-full h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 royal-glass hover:bg-[#debd68]/20 rounded-full w-12 h-12"
                  >
                    <Heart className="h-5 w-5 text-[#debd68]" />
                  </Button>
                  {product.featured && (
                    <Badge className="absolute top-4 left-4 royal-gradient-bg text-[#1a1a2e] font-semibold px-4 py-2 rounded-full">
                      Signature
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 space-y-4 flex-grow">
                <div className="space-y-3">
                  <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-[#1a1a2e] text-balance leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-[#1a1a2e]/70 text-pretty leading-relaxed text-sm sm:text-base">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "fill-[#debd68] text-[#debd68]" : "text-[#debd68]/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-[#1a1a2e]/60 font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold royal-gradient-text font-serif">
                    €{product.price.eur}
                  </div>
                  <div className="text-[#1a1a2e]/60 text-sm sm:text-base">₹{product.price.inr}</div>
                </div>
              </CardContent>

              <CardFooter className="p-4 sm:p-6 pt-0 mt-auto">
                <Button className="w-full premium-button text-[#1a1a2e] font-semibold py-4 px-6 rounded-2xl group flex items-center justify-center min-h-[56px]">
                  <ShoppingCart className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="text-sm sm:text-base">Add to Collection</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 lg:mt-20">
          <Button
            variant="outline"
            size="lg"
            className="glass-button text-[#1a1a2e] responsive-text-lg px-8 lg:px-12 py-4 rounded-2xl border-2 border-[#debd68] font-semibold bg-transparent"
          >
            Explore Full Collection
          </Button>
        </div>
      </div>
    </section>
  )
}
