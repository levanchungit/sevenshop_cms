import { RefreshTokenPayload } from './../interfaces/Auth'
import { SignInPayload } from 'interfaces/Auth'
import { API_URL } from 'global/config'
import { API_ROUTES } from 'global/constants/apiRoutes'
import axios from 'axios'
import axiosClient from './config/axiosClient'

const authAPI = {
  login(payload: SignInPayload) {
    return axios.post(API_URL + API_ROUTES.login, payload)
  },
  logout() {
    return axiosClient.get(API_ROUTES.logout)
  },
  refresh_Token(payLoad: RefreshTokenPayload) {
    return axios.post(API_URL + API_ROUTES.refresh_token, payLoad)
  },
  me() {
    return axiosClient.get(API_ROUTES.me)
  }
}

export default authAPI
