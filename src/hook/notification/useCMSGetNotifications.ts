import { APIResError } from 'interfaces/APIResponse'
import { API_ROUTES } from 'global/constants'
import useSWR, { SWRResponse } from 'swr'
import { Maybe } from 'utils/types'
import { CmsNotification } from 'interfaces/Notification'
import notificationsAPI from 'modules/notificationsAPI'

type SWRData = CmsNotification
type SWRError = Maybe<APIResError>

interface UseCMSNotifications extends Omit<SWRResponse<SWRData, SWRError>, 'data'> {
  cms_notifications: CmsNotification[]
}

const SWR_KEY = API_ROUTES.getNotifications

const fetcher = async () => {
  const result = await notificationsAPI.getNotifications()

  return result
}

export default function useCMSGetNotifications(): UseCMSNotifications {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, ...others } = swr

  return { cms_notifications: data, ...others }
}
