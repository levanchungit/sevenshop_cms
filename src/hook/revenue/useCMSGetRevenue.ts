import useSWR from 'swr'
import { useMemo } from 'react'
import revenueAPI from 'modules/revenueAPI'

const fetcher = async (url: string) => {
  const result = await revenueAPI.getRevenue(url)

  return result
}

// create hook
export default function useCMSGetRevenue(status: string, start_date: string, end_date: string) {
  const url = useMemo(() => {
    const params = new URLSearchParams({
      status,
      start_date,
      end_date
    })

    return `http://localhost:3000/revenue?${params.toString()}`
  }, [status, start_date, end_date])

  const { data, error } = useSWR(url, fetcher)

  const revenue = useMemo(() => {
    return data?.data
  }, [data])

  return {
    revenue,
    isLoading: !error && !data,
    isError: error
  }
}
