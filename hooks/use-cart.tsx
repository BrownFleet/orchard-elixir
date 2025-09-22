"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { CartItem } from "@/lib/types"
import { getCartItems, addToCart as addToCartAPI, updateCartItemQuantity, removeFromCart, clearCart } from "@/lib/cart"

interface CartContextType {
  items: CartItem[]
  loading: boolean
  totalItems: number
  totalPrice: { eur: number; inr: number }
  addToCart: (productId: string, quantity?: number) => Promise<{ success: boolean; error?: string }>
  updateQuantity: (itemId: string, quantity: number) => Promise<{ success: boolean; error?: string }>
  removeItem: (itemId: string) => Promise<{ success: boolean; error?: string }>
  clearCart: () => Promise<{ success: boolean; error?: string }>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  const refreshCart = async () => {
    setLoading(true)
    try {
      const cartItems = await getCartItems()
      setItems(cartItems)
    } catch (error) {
      console.error("Error refreshing cart:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshCart()
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const totalPrice = items.reduce(
    (sum, item) => {
      if (item.product) {
        return {
          eur: sum.eur + item.product.price_eur * item.quantity,
          inr: sum.inr + item.product.price_inr * item.quantity,
        }
      }
      return sum
    },
    { eur: 0, inr: 0 },
  )

  const addToCart = async (productId: string, quantity = 1) => {
    const result = await addToCartAPI(productId, quantity)
    if (result.success) {
      await refreshCart()
    }
    return result
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    const result = await updateCartItemQuantity(itemId, quantity)
    if (result.success) {
      await refreshCart()
    }
    return result
  }

  const removeItem = async (itemId: string) => {
    const result = await removeFromCart(itemId)
    if (result.success) {
      await refreshCart()
    }
    return result
  }

  const clearCartItems = async () => {
    const result = await clearCart()
    if (result.success) {
      await refreshCart()
    }
    return result
  }

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        totalItems,
        totalPrice,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart: clearCartItems,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
