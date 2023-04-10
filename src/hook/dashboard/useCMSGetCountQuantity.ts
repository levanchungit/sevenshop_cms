import { API_ROUTES } from 'global/constants'
import dashboardAPI from 'modules/dashboardAPI'
import useSWR from 'swr'

const SWR_KEY = API_ROUTES.getCountQuantity

const fetcher = async () => {
  const response = await dashboardAPI.getCountQuantity()

  return response
}

export default function useCMSGetCountQuantity() {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, error, isLoading, mutate, ...others } = swr

  return {
    cms_count_quantity: data,
    cms_err_count_quantity: error,
    cms_loading_count_quantity: isLoading,
    cms_mutate_count_quantity: mutate,
    ...others
  }
}
