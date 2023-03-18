export type SignInPayload = {
  email: string
  password: string
}

export type SignInSuccessData = {
  message: string
  access_token: string
  refresh_token: string
}

export type GetMeSuccessData = {
  _id: string
  email: string
  password: string
  full_name: string
  phone: string
  avatar: string
  cover_image: string
  gender: string
  birthday: string
  addresses: []
  status: string
  product_favorites: []
  recent_products: []
  otp: {
    exp: string
    _id: string
  }
  access_token: string
  role: string
  membership: {
    name: string
    description: string
    point: number
  }
  cart_id: string
  orders: []
  history_search: []
  created_at: string
  created_by: string
  modify: [
    {
      action: string
      date: string
      _id: string
    },
    {
      action: string
      date: string
      _id: string
    }
  ]
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

export type MetaDataDetail = {
  _id: string
  code_name: string
  meta_data_id: string
  active: boolean
  num1: string
  num2: number
  num3: number
  num4: string
  num5: number
  eng: string
  kr: string
  create_at: string
  create_by: string
  modify_at: string
  modify_by: string
}
