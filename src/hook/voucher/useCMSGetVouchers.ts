import { CmsCategory } from 'interfaces/Category'
import { APIResError } from 'interfaces/APIResponse'
import { API_ROUTES } from 'global/constants'
import useSWR, { SWRResponse } from 'swr'
import { Maybe } from 'utils/types'
import { CmsVoucher } from 'interfaces/Voucher'
import vouchersAPI from 'modules/vouchersAPI'

type SWRData = CmsCategory
type SWRError = Maybe<APIResError>

interface UseCMSVouchers extends Omit<SWRResponse<SWRData, SWRError>, 'data'> {
  cms_vouchers: CmsVoucher[]
}

const SWR_KEY = API_ROUTES.getVouchers

const fetcher = async () => {
  const result = await vouchersAPI.getVouchers()

  return result
}

export default function useCMSGetVouchers(): UseCMSVouchers {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, ...others } = swr

  return { cms_vouchers: data, ...others }
}
