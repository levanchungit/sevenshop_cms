import { ProductData } from './../../interfaces/Auth'
import { authAPI } from 'modules'
import useSWR, { Fetcher } from 'swr'

// const SWR_KEY = API_ROUTES.getProductDetail

const fetcher: Fetcher<ProductData> = async (id: string) => {
  const result = await authAPI.getProductDetail(id)

  return result
}

export default function useCMSGetProductDetail(id: string) {
  const key = `/${id}`

  const swr = useSWR(key, fetcher)
  const { data, ...others } = swr

  return { data, ...others }
}
