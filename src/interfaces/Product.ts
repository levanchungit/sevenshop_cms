import { STATUS_PRODUCT } from 'global/constants'

//new
export type IModify = {
  action: string
  date: string
}

export type IStock = {
  size_id: string
  color_id: string
  quantity: number
}

export interface CmsProduct {
  _id?: string
  name: string
  price: number
  price_sale: number
  description: string
  images: string[]
  stock: IStock[]
  status: STATUS_PRODUCT
  category_ids: string[]
  color_ids: string[]
  size_ids: string[]
  created_at: string
  created_by: string
  modify: IModify[]
}

export interface CreateCmsProductPayload {
  name: string
  price: number
  description: string
  category_ids: string[]
  color_ids: string[]
  size_ids: string[]
}

export interface EditCmsProductPayload extends CreateCmsProductPayload {
  _id: string
}
