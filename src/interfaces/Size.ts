import { IModify } from 'global/constants'

export interface CmsSize {
  _id: string
  name: string
  size: string
  created_at: string
  created_by: string
  modify: IModify[]
}

export interface CreateCmsSizePayload {
  name: string
  size: string
}

export interface EditCmsSizePayload extends CreateCmsSizePayload {
  _id: string
}
