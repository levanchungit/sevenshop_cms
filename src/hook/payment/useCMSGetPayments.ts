import { CmsCategory } from 'interfaces/Category'
import { APIResError } from 'interfaces/APIResponse'
import { API_ROUTES } from 'global/constants'
import useSWR, { SWRResponse } from 'swr'
import { Maybe } from 'utils/types'
import { CmsPayment } from 'interfaces/Payment'
import dashboardAPI from 'modules/dashboardAPI'

type SWRData = CmsCategory
type SWRError = Maybe<APIResError>

interface UseCMSPayments extends Omit<SWRResponse<SWRData, SWRError>, 'data'> {
  cms_payments: CmsPayment[]
}

const SWR_KEY = API_ROUTES.getTransactions

const fetcher = async () => {
  const result = await dashboardAPI.getTransaction()

  return result
}

export default function useCMSGetPayments(): UseCMSPayments {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, ...others } = swr

  return { cms_payments: data, ...others }
}
