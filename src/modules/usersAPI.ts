import { API_ROUTES } from 'global/constants/apiRoutes'
import axiosClient from './config/axiosClient'

const authAPI = {
  me() {
    return axiosClient.get(API_ROUTES.me)
  }
}

export default authAPI
