import { SignInPayload } from 'interfaces/Auth'
import { API_URL } from 'global/config'
import { API_ROUTES } from 'global/constants/apiRoutes'
import axios from 'axios'
import axiosClient from './config/axiosClient'

const authAPI = {
  //AUTH
  login(payload: SignInPayload) {
    return axios.post(API_URL + API_ROUTES.login, payload)
  },
  me() {
    return axiosClient.get(API_ROUTES.me)
  },
  logout() {
    return axiosClient.get(API_ROUTES.logout)
  }
}

export default authAPI
