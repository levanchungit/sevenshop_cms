import { CmsProduct, CreateCmsProductPayload } from 'interfaces/Product'
import { SignInPayload, RefreshTokenPayload } from 'interfaces/Auth'
import { API_URL } from 'global/config'
import { API_ROUTES } from 'global/constants/apiRoutes'
import axios from 'axios'

import axiosClient from './config/axiosClient'
import { TypeReturn } from 'interfaces/APIResponse'

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
  logout() {
    return axiosClient.get(API_ROUTES.logout)
  },

  async getProducts() {
    const response = await axios.get(API_URL + API_ROUTES.getProducts)

    return response.data.results
  },

  async getCategories() {
    const response = await axios.get(API_URL + API_ROUTES.getCategories)

    return response.data.results
  },

  async getColors() {
    const response = await axios.get(API_URL + API_ROUTES.getColors)

    return response.data.results
  },

  async getSizes() {
    const response = await axios.get(API_URL + API_ROUTES.getSizes)

    return response.data.results
  },

  async createProduct(payload: CreateCmsProductPayload) {
    const response = await axiosClient.post(API_ROUTES.createProduct, payload)
    console.log(response)

    return response
  },

  async updateProduct(id: string, payload: CreateCmsProductPayload) {
    const response = await axiosClient.post(API_ROUTES.updateProduct + id, payload)

    return response.data.result
  },

  async deleteProduct(id: string) {
    const response = await axiosClient.delete(API_ROUTES.deleteProduct(id))

    return response
  },

  getProductDetail(id: string): TypeReturn<CmsProduct> {
    return axios.get(API_URL + API_ROUTES.getProductDetail(id))
  }
}

export default authAPI
