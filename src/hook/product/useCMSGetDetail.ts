import { productsAPI } from 'modules'
import useSWR from 'swr'
import { useMemo } from 'react'

const fetcher = async (id: string) => {
  const result = await productsAPI.getProductDetail(id)

  return result
}

export default function useCMSGetProductDetail(id: string) {
  const key = useMemo(() => [id], [id]) // sử dụng useMemo
  const swr = useSWR(key, fetcher, { revalidateOnFocus: true }) // sử dụng caching
  const { data, ...others } = swr

  return { cmsProduct: data, ...others }
}
