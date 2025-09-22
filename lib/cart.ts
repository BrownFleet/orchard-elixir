"use client"

import { createClient } from "@/lib/supabase/client"
import type { CartItem } from "@/lib/types"

export async function addToCart(productId: string, quantity = 1): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return { success: false, error: "Please sign in to add items to cart" }
    }

    // Check if item already exists in cart
    const { data: existingItem, error: checkError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      throw checkError
    }

    if (existingItem) {
      // Update existing item
      const { error: updateError } = await supabase
        .from("cart_items")
        .update({
          quantity: existingItem.quantity + quantity,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingItem.id)

      if (updateError) throw updateError
    } else {
      // Add new item
      const { error: insertError } = await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: productId,
        quantity,
      })

      if (insertError) throw insertError
    }

    return { success: true }
  } catch (error) {
    console.error("Error adding to cart:", error)
    return { success: false, error: "Failed to add item to cart" }
  }
}

export async function getCartItems(): Promise<CartItem[]> {
  try {
    const supabase = createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return []
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        *,
        product:products(*)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error("Error fetching cart items:", error)
    return []
  }
}

export async function updateCartItemQuantity(
  itemId: string,
  quantity: number,
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()

    if (quantity <= 0) {
      return removeFromCart(itemId)
    }

    const { error } = await supabase
      .from("cart_items")
      .update({
        quantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", itemId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error updating cart item:", error)
    return { success: false, error: "Failed to update cart item" }
  }
}

export async function removeFromCart(itemId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("cart_items").delete().eq("id", itemId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error removing from cart:", error)
    return { success: false, error: "Failed to remove item from cart" }
  }
}

export async function clearCart(): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return { success: false, error: "User not authenticated" }
    }

    const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error clearing cart:", error)
    return { success: false, error: "Failed to clear cart" }
  }
}
