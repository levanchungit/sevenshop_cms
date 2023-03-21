import { API_ROUTES } from 'global/constants'
import { ordersAPI } from 'modules'
import useSWR from 'swr'

const SWR_KEY = API_ROUTES.getOrders

const fetcher = async () => {
  const response = await ordersAPI.getOrders()

  return response
}

export default function useCMSGetOrders() {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, error, isLoading, mutate, ...others } = swr

  return {
    cms_orders: data,
    cms_err_orders: error,
    cms_loading_orders: isLoading,
    cms_mutate_orders: mutate,
    ...others
  }
}
