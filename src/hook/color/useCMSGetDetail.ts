import { colorsAPI } from 'modules'
import useSWR from 'swr'
import { useMemo } from 'react'

const fetcher = async (id: string) => {
  const result = await colorsAPI.getColorDetail(id)

  return result
}

export default function useCMSGetColorDetail(id: string) {
  const key = useMemo(() => [id], [id]) // sử dụng useMemo
  const swr = useSWR(key, fetcher, { revalidateOnFocus: true }) // sử dụng caching
  const { data, ...others } = swr

  return { cmsColor: data, ...others }
}
