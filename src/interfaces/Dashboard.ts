export type RevenuePayload = {
  status: string
}

export type cmsHistorySearch = {
  _id: string
  keyword: string
  created_at: string
}

export type cmsProductsBestSellers = {
  _id: string
  product_name: string
  price: number
  price_sale?: number
  sold_quantity: number
  total_revenue: number
  image: string
  views: number
  favorites: number
}
