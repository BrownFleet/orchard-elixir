"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, ShoppingCart, Minus, Plus, Share, Truck, Shield, RotateCcw } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const categoryLabels = {
    essential_oils: "Essential Oil",
    herbs: "Premium Herb",
    blends: "Signature Blend",
  }

  const images = [
    product.image_url || "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock_quantity) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log("Add to cart:", product.id, "quantity:", quantity)
  }

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    // TODO: Implement wishlist functionality
    console.log("Toggle wishlist:", product.id)
  }

  return (
    <div className="container px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-8">
        <span>Home</span> / <span>Products</span> / <span>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-border"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{categoryLabels[product.category]}</Badge>
              {product.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-balance">{product.name}</h1>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 // Mock rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.8 (127 reviews)</span>
            </div>

            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">€{product.price_eur}</div>
              <div className="text-lg text-muted-foreground">₹{product.price_inr}</div>
            </div>

            <p className="text-muted-foreground text-pretty leading-relaxed">{product.description}</p>
          </div>

          {/* Stock Status */}
          <div className="space-y-2">
            {product.stock_quantity > 0 ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">
                  {product.stock_quantity > 10 ? "In Stock" : `Only ${product.stock_quantity} left in stock`}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-red-600">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock_quantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">Total: €{(product.price_eur * quantity).toFixed(2)}</div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={product.stock_quantity === 0}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>

              <Button variant="outline" size="lg" onClick={handleToggleWishlist}>
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>

              <Button variant="outline" size="lg">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium text-sm">Free Shipping</div>
                    <div className="text-xs text-muted-foreground">On orders over €50</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium text-sm">Quality Guarantee</div>
                    <div className="text-xs text-muted-foreground">100% pure & natural</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium text-sm">Easy Returns</div>
                    <div className="text-xs text-muted-foreground">30-day return policy</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Our {product.name} is carefully crafted using traditional cold-pressing methods to preserve the
                    natural essence and therapeutic properties. Each bottle represents our commitment to quality and
                    purity, sourced from the finest ingredients available.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingredients" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                <p className="text-muted-foreground">
                  100% Pure {product.name} - No additives, no synthetic fragrances, no dilution.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">How to Use</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>• For aromatherapy: Add 3-5 drops to a diffuser</p>
                  <p>• For topical use: Dilute with carrier oil before applying to skin</p>
                  <p>• For bath: Add 5-10 drops to warm bath water</p>
                  <p>• Always perform a patch test before first use</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <p className="text-muted-foreground">
                  Reviews will be displayed here once the review system is implemented.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
