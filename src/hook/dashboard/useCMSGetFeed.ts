import { API_ROUTES } from 'global/constants'
import dashboardAPI from 'modules/dashboardAPI'
import useSWR from 'swr'

const SWR_KEY = API_ROUTES.getFeed

const fetcher = async () => {
  const response = await dashboardAPI.getFeed()

  return response
}

export default function useCMSGetFeed() {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, error, isLoading, mutate, ...others } = swr

  return {
    cms_feed: data,
    cms_err_feed: error,
    cms_loading_feed: isLoading,
    cms_mutate_feed: mutate,
    ...others
  }
}
