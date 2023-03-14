import { CmsCategory } from 'interfaces/Category'
import { APIResError } from 'interfaces/APIResponse'
import { API_ROUTES } from 'global/constants'
import { categoriesAPI } from 'modules'
import useSWR, { SWRResponse } from 'swr'
import { Maybe } from 'utils/types'

type SWRData = CmsCategory
type SWRError = Maybe<APIResError>

interface UseCMSCategories extends Omit<SWRResponse<SWRData, SWRError>, 'data'> {
  cms_categories: CmsCategory[]
}

const SWR_KEY = API_ROUTES.getCategories

const fetcher = async () => {
  const result = await categoriesAPI.getCategories()

  return result
}

export default function useCMSGetCategories(): UseCMSCategories {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, ...others } = swr

  return { cms_categories: data, ...others }
}
