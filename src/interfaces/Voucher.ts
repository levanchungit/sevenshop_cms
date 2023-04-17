import { IModify, TYPE_VOUCHER } from 'global/constants'

export interface CmsVoucher {
  _id: string
  name: string
  type: TYPE_VOUCHER
  quantity: number
  value: number
  start_date: string
  end_date: string
  created_at: string
  created_by: string
  modify: IModify[]
}

export interface CreateCmsVoucherPayload {
  name: string
  type: string
  quantity: number
  value: number
  start_date: string
  end_date: string
}

export interface EditCmsVoucherPayload extends CreateCmsVoucherPayload {
  _id: string
}
