import { CmsColor } from './../../interfaces/Color'
import { API_ROUTES } from 'global/constants'
import { authAPI } from 'modules'
import useSWR, { SWRResponse } from 'swr'
import { Maybe } from 'utils/types'
import { APIResError } from 'interfaces/APIResponse'

type SWRData = CmsColor
type SWRError = Maybe<APIResError>

interface UseCMSColor extends Omit<SWRResponse<SWRData, SWRError>, 'data'> {
  cms_colors: CmsColor[]
}

const SWR_KEY = API_ROUTES.getColors

const fetcher = async () => {
  const result = await authAPI.getColors()

  return result
}

export default function useCMSGetColors(): UseCMSColor {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, ...others } = swr

  return { cms_colors: data, ...others }
}
