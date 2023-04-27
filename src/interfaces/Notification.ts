import { IModify } from 'global/constants'

export interface CmsNotification {
  _id: string
  title: string
  body: string
  image: string
  from_user_id: string
  to_user_id: string[]
  created_at: string
  created_by: string
  modify: IModify[]
  tokens?: string[]
  from_user_full_name?: string
}

export interface CreateCmsNotificationPayload {
  title: string
  body: string
  image: string

  // to_user_id: string[]
  // tokens: string[]
}
