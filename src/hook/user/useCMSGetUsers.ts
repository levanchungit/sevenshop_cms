import { CmsCategory } from 'interfaces/Category'
import { APIResError } from 'interfaces/APIResponse'
import { API_ROUTES } from 'global/constants'
import { usersAPI } from 'modules'
import useSWR, { SWRResponse } from 'swr'
import { Maybe } from 'utils/types'
import { CmsUser } from 'interfaces/User'

type SWRData = CmsCategory
type SWRError = Maybe<APIResError>

interface UseCMSUsers extends Omit<SWRResponse<SWRData, SWRError>, 'data'> {
  cms_users: CmsUser[]
}

const SWR_KEY = API_ROUTES.getUsers

const fetcher = async () => {
  const result = await usersAPI.getUsers()

  return result
}

export default function useCMSGetUsers(): UseCMSUsers {
  const swr = useSWR(SWR_KEY, fetcher)
  const { data, ...others } = swr

  return { cms_users: data, ...others }
}
