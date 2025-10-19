"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { Modal } from "@/ui/modal";
import { useAuth } from "@/hooks/use-auth";

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
}

export function ProductCard({
  product,
  showQuickView = false,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
   const { user } = useAuth()
  const { addToCart } = useCart(); // assuming user info comes from this hook

  const categoryLabels = {
    essential_oils: "Essential Oil",
    herbs: "Premium Herb",
    blends: "Signature Blend",
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    // 🚨 If user not logged in, show modal instead of adding to cart
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setIsLoading(true);

    try {
      const result = await addToCart(product.id, 1);
      if (result.success) {
        console.log("Added to cart successfully");
      } else {
        alert(result.error || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <>
      {/* 🧩 Product Card */}
      <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <Link href={`/products/${product.id}`}>
              <img
                src={
                  product.image_url || "/placeholder.svg?height=300&width=300"
                }
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/80 hover:bg-background"
                onClick={handleToggleWishlist}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
              {showQuickView && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-background/80 hover:bg-background"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.featured && (
                <Badge className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs">
                {categoryLabels[product.category]}
              </Badge>
            </div>

            {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
              <Badge className="absolute bottom-3 left-3 bg-orange-500 text-white">
                Only {product.stock_quantity} left
              </Badge>
            )}

            {product.stock_quantity === 0 && (
              <Badge className="absolute bottom-3 left-3 bg-red-500 text-white">
                Out of Stock
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-3 flex-1">
          <div className="space-y-2">
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-lg text-balance leading-tight hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground text-pretty line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < 4
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.8 (127)</span>
          </div>

          <div className="space-y-1">
            <div className="text-xl font-bold text-primary">
              €{product.price_eur}
            </div>
            <div className="text-sm text-muted-foreground">
              ₹{product.price_inr}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full group"
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0 || isLoading}
          >
            <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            {isLoading
              ? "Adding..."
              : product.stock_quantity === 0
              ? "Out of Stock"
              : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>

      {/* 💬 Login Required Modal */}
      <Modal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        title="Login Required"
        description="You need to be logged in to add items to your cart."
        confirmText="Login"
        cancelText="Cancel"
        onConfirm={() => {
          setShowLoginModal(false);
          window.location.href = "/auth/login";
        }}
      />
    </>
  );
}
