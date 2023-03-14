import { CreateCmsCategoryPayload } from 'interfaces/Category'
import { CmsProduct, CreateCmsProductPayload } from 'interfaces/Product'
import { SignInPayload, SignInSuccessData } from 'interfaces/Auth'
import { API_URL } from 'global/config'
import { API_ROUTES } from 'global/constants/apiRoutes'
import axios from 'axios'

import axiosClient from './config/axiosClient'
import { TypeReturn } from 'interfaces/APIResponse'
import Cookies from 'js-cookie'

const authAPI = {
  //AUTH
  login(payload: SignInPayload): TypeReturn<SignInSuccessData> {
    return axios.post(API_URL + API_ROUTES.login, payload)
  },
  async me() {
    const response = await axiosClient.get(API_ROUTES.me)
    console.log(response)

    return response.data.result
  },
  logout() {
    return axiosClient.get(API_ROUTES.logout)
  },

  //PRODUCT
  async getProducts() {
    const response = await axios.get(API_URL + API_ROUTES.getProducts)

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
  },

  //CATEGORY
  async getCategories() {
    const response = await axios.get(API_URL + API_ROUTES.getCategories)
    console.log('RES', response)

    return response.data.results
  },

  async createCategory(payload: CreateCmsCategoryPayload) {
    const response = await axiosClient.post(API_ROUTES.createCategory, payload)
    console.log(response)

    return response
  },

  //COLORS
  async getColors() {
    const response = await axios.get(API_URL + API_ROUTES.getColors)

    return response.data.results
  },

  //SIZES
  async getSizes() {
    const response = await axios.get(API_URL + API_ROUTES.getSizes)

    return response.data.results
  }
}

export default authAPI
