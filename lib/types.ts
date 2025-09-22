export interface Product {
  id: string
  name: string
  description: string | null
  price_eur: number
  price_inr: number
  category: "essential_oils" | "herbs" | "blends"
  image_url: string | null
  stock_quantity: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
  product?: Product
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string | null
  created_at: string
}

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: Product
}
