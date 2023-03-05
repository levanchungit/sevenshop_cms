export type SignInPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  email: string
}

export type CheckOTPPayload = {
  id: string
  otp: string
}

export type SetPasswordPayload = {
  password: string
}

export type RefreshTokenPayload = {
  refresh_token: string | null | undefined
}

export type GetMeSuccessData = {
  _id: string
  email: string
  status: string
  product_favorites: []
  recent_products: []
  language: number
  role_type: number
  membership_type: number
  create_at: string
  address: []
  create_by: string
  __v: 0
  access_token: string
  modify_at: string
  modify_by: string
  refresh_token: string
  password: string
  image: string
}

export type GetProductsSuccessData = {
  _id: string
  name: string
  price: number
  price_sale: number
  description: string
  images: []
  active: boolean
  storage_quantity: number
  properties_type: []
  categories_type: string
  create_at: string
  create_by: string
}

export type GetProductData = {
  name: string
  price: number
  quantity: number
}
