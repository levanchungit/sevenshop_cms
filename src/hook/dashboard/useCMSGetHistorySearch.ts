import { API_ROUTES } from 'global/constants'
import dashboardAPI from 'modules/dashboardAPI'
import useSWR from 'swr'

const SWR_KEY = API_ROUTES.getHistorySearch

const fetcher = async () => {
  const response = await dashboardAPI.getHistorySearch()

  return response
}

export default function useCMSGetHistorySearch() {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, error, isLoading, mutate, ...others } = swr

  return {
    cms_history_search: data,
    cms_err_history_search: error,
    cms_loading_history_search: isLoading,
    cms_mutate_history_search: mutate,
    ...others
  }
}
