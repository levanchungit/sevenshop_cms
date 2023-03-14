import { API_ROUTES } from 'global/constants'
import { authAPI } from 'modules'
import useSWR from 'swr'

const SWR_KEY = API_ROUTES.getProducts

const fetcher = async () => {
  const response = await authAPI.getProducts()

  return response
}

export default function useCMSGetProducts() {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, error, isLoading, mutate, ...others } = swr

  return {
    cms_products: data,
    cms_err_products: error,
    cms_loading_products: isLoading,
    cms_mutate_product: mutate,
    ...others
  }
}
