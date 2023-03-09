import { API_ROUTES } from 'global/constants'
import { authAPI } from 'modules'
import useSWR from 'swr'

const SWR_KEY = API_ROUTES.getProducts

const fetcher = async () => {
  const result = await authAPI.getProducts()

  return result
}

export default function useCMSGetProducts() {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, ...others } = swr

  return { data, ...others }
}
