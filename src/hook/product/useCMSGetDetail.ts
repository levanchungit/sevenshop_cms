import { CmsProduct } from 'interfaces/Product'
import { API_ROUTES } from 'global/constants'
import { authAPI } from 'modules'
import useSWR, { Fetcher, SWRResponse } from 'swr'
import { Maybe } from 'utils/types'
import { APIResError } from 'interfaces/APIResponse'

const SWR_KEY = API_ROUTES.getProductDetail

type SWRData = CmsProduct
type SWRError = Maybe<APIResError>

interface UseCMSProductDetail extends Omit<SWRResponse<SWRData, SWRError>, 'data'> {
  cmsProduct?: CmsProduct
}

const fetcher: Fetcher<SWRData, [string, string]> = async ([, id]) => {
  const result = await authAPI.getProductDetail(id)

  return result
}

export default function useCMSGetProductDetail(id: string): UseCMSProductDetail {
  const key = [SWR_KEY, id]
  const swr = useSWR(key, fetcher)
  const { data, ...others } = swr

  return { cmsProduct: data, ...others }
}
