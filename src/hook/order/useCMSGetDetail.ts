import { ordersAPI } from 'modules'
import useSWR from 'swr'
import { useMemo } from 'react'

const fetcher = async (id: string) => {
  const result = await ordersAPI.getOrderDetail(id)

  return result
}

export default function useCMSGetOrderDetail(id: string) {
  const key = useMemo(() => [id], [id]) // sử dụng useMemo
  const swr = useSWR(key, fetcher, { revalidateOnFocus: true }) // sử dụng caching
  const { data, ...others } = swr

  return { cmsOrder: data, ...others }
}
