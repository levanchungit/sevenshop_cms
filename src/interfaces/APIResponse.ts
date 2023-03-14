export type DataResSuccess<T> = {
  message: string
  result: T[]
}

export type APIResSuccess<T> = {
  code: string
  message: string
  result: T
}
export interface APIResError {
  code: string
  message: string
  status: number
}

export type TypeReturn<T> = Promise<APIResSuccess<T>>
