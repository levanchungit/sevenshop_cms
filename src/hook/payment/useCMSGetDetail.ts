import useSWR from 'swr'
import { useMemo } from 'react'
import vouchersAPI from 'modules/vouchersAPI'

const fetcher = async (id: string) => {
  const result = await vouchersAPI.getVoucherDetail(id)

  return result
}

export default function useCMSGetVoucherDetail(id: string) {
  const key = useMemo(() => [id], [id]) // sử dụng useMemo
  const swr = useSWR(key, fetcher, { revalidateOnFocus: true }) // sử dụng caching
  const { data, ...others } = swr

  return { cmsVoucher: data, ...others }
}
