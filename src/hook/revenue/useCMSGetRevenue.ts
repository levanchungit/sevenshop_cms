import useSWR from 'swr'
import { useMemo } from 'react'
import revenueAPI from 'modules/revenueAPI'

const fetcher = async (status: string) => {
  const result = await revenueAPI.getRevenue(status)

  return result
}

export default function useCMSGetRevenue(status: string) {
  const key = useMemo(() => [status], [status]) // sử dụng useMemo
  const swr = useSWR(key, fetcher, { revalidateOnFocus: true }) // sử dụng caching
  const { data, ...others } = swr

  return { cmsRevenue: data, ...others }
}
