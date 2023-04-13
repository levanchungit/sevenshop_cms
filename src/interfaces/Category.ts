import { IModify } from 'global/constants'

export interface CmsCategory {
  _id: string
  name: string
  description: string
  product_ids: []
  created_at: string
  created_by: string
  modify: IModify[]
}

export interface CreateCmsCategoryPayload {
  name: string
  description: string
}

export interface EditCmsCategoryPayload extends CreateCmsCategoryPayload {
  _id: string
}
