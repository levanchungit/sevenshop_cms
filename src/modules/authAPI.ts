import { SignInPayload, RefreshTokenPayload } from './../interfaces/Auth'
import { API_URL } from './../global/config'
import { API_ROUTES } from './../global/constants/apiRoutes'
import axios from 'axios'

import axiosClient from './config/axiosClient'

const authAPI = {
  async login(payload: SignInPayload) {
    const response = await axios.post(API_URL + API_ROUTES.login, payload)
    localStorage.setItem('access_token', response.data.access_token)
    localStorage.setItem('refresh_token', response.data.refresh_token)

    return response
  },

  me() {
    return axiosClient.get(API_ROUTES.me)
  },
  logout(payload: RefreshTokenPayload) {
    return axiosClient.post(API_ROUTES.logout, payload)
  },

  async getProduct() {
    const result = await axiosClient.get(API_ROUTES.getProducts)

    return result
  }
}

export default authAPI
