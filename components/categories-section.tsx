import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Essential Oils",
    description: "Pure cold-pressed oils for aromatherapy and wellness",
    image: "/essential-oils-collection-luxury.jpg",
    count: "25+ Products",
  },
  {
    name: "Premium Herbs",
    description: "Hand-selected herbs for natural healing and vitality",
    image: "/premium-herbs-collection-jars.jpg",
    count: "15+ Products",
  },
  {
    name: "Signature Blends",
    description: "Expertly crafted blends for specific wellness needs",
    image: "/signature-blend-bottles-luxury.jpg",
    count: "10+ Products",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Explore Our Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From pure essential oils to expertly crafted blends, discover the perfect products for your wellness
            journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-medium">{category.count}</div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-balance">{category.name}</h3>
                  <p className="text-muted-foreground text-pretty">{category.description}</p>
                </div>

                <Button variant="ghost" className="p-0 h-auto font-medium group/btn">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
