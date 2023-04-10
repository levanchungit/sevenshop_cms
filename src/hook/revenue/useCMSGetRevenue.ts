import { API_ROUTES } from './../../global/constants/apiRoutes'
import { API_URL } from 'global/config'
import useSWR from 'swr'
import { useMemo } from 'react'
import dashboardAPI from 'modules/dashboardAPI'

const fetcher = async (url: string) => {
  const result = await dashboardAPI.getRevenue(url)

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

    return API_URL + API_ROUTES.getRevenue + `?${params.toString()}`
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
