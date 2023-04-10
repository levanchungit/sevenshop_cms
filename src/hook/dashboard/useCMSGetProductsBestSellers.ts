import { API_ROUTES } from 'global/constants'
import dashboardAPI from 'modules/dashboardAPI'
import useSWR from 'swr'

const SWR_KEY = API_ROUTES.getProductsBestSellers

const fetcher = async () => {
  const response = await dashboardAPI.getProductsBestSellers()

  return response
}

export default function useCMSGetProductsBestSellers() {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, error, isLoading, mutate, ...others } = swr

  return {
    cms_products_best_sellers: data,
    cms_err_products_best_sellers: error,
    cms_loading_products_best_sellers: isLoading,
    cms_mutate_products_best_sellers: mutate,
    ...others
  }
}
