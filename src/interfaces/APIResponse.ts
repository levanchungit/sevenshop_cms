import { Maybe } from 'utils/types'

export interface ErrorForm {
  code: string
  field: string
}
export interface APIResSuccess<T = unknown> {
  code: string
  message: string
  data: T
}

export interface APIResError {
  code: string
  message: string
  status: number
  errors: ErrorForm[]
}

export type MaybeAPIResError = Maybe<APIResError>

export type TypeReturn<T> = Promise<APIResSuccess<T>>
