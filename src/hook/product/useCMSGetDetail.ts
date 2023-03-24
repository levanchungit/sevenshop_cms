import { productsAPI } from 'modules'
import useSWR from 'swr'
import { useCallback } from 'react'

const fetcher = async (id: string) => {
  const result = await productsAPI.getProductDetail(id)

  return result
}

export default function useCMSGetProductDetail(id: string) {
  const key = useCallback(() => id, [id])
  const swr = useSWR(key, fetcher, { revalidateOnFocus: true }) // sử dụng caching
  const { data, ...others } = swr

  return { cmsProduct: data, ...others }
}
