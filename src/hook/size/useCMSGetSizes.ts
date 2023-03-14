import { Maybe } from 'utils/types'
import { CmsSize } from './../../interfaces/Size'
import { API_ROUTES } from 'global/constants'
import { authAPI } from 'modules'
import useSWR, { SWRResponse } from 'swr'
import { APIResError } from 'interfaces/APIResponse'

type SWRData = CmsSize
type SWRError = Maybe<APIResError>

interface UseCMSSize extends Omit<SWRResponse<SWRData, SWRError>, 'data'> {
  cms_sizes: CmsSize[]
}

const SWR_KEY = API_ROUTES.getSizes

const fetcher = async () => {
  const result = await authAPI.getSizes()

  return result
}

export default function useCMSGetSizes(): UseCMSSize {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, ...others } = swr

  return { cms_sizes: data, ...others }
}
