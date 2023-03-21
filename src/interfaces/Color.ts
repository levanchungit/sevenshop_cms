import { IModify } from 'global/constants'

export interface CmsColor {
  _id: string
  name: string
  code: string
  created_at: string
  created_by: string
  modify: IModify[]
}

export interface CreateCmsColorPayload {
  name: string
  code: string
}

export interface EditCmsColorPayload extends CreateCmsColorPayload {
  _id: string
}
