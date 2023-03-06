import { SignInPayload, RefreshTokenPayload, CreateProductData } from './../interfaces/Auth'
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

  async getProducts() {
    const result = await axiosClient.get(API_ROUTES.getProducts)

    return result
  },

  async getCategories() {
    const idCategories = '63f325ad7e47080165a85199'

    const result = await axiosClient.get(API_ROUTES.getCategories + idCategories)

    return result
  },

  async getColors() {
    const idColors = '63f8d5fc135f11bc21b9bd4c'

    const result = await axiosClient.get(API_ROUTES.getCategories + idColors)

    return result
  },

  async getSizes() {
    const idSizes = '63f8d693243d03d8d48ddac3'

    const result = await axiosClient.get(API_ROUTES.getCategories + idSizes)

    return result
  },

  async createProduct(payload: CreateProductData) {
    return await axiosClient.post(API_ROUTES.createProduct, payload)
  }
}

export default authAPI
