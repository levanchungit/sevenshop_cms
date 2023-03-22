import { IModify, IProductOrder, PAYMENT_TYPE, STATUS_ORDER } from 'global/constants'

export interface CmsOrder {
  _id: string
  user_id: string
  products: IProductOrder
  total_price: number
  total_discount: number
  total_before_discount: number
  note: string
  payment_type: PAYMENT_TYPE
  status: STATUS_ORDER
  voucher_id: string
  created_at: string
  created_by: string
  modify: IModify[]
}

export interface EditCmsOrderPayload {
  _id: string
  status: string
}
