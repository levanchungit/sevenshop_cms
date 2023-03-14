import { CmsProduct, CreateCmsProductPayload } from 'interfaces/Product'
import { API_URL } from 'global/config'
import { API_ROUTES } from 'global/constants/apiRoutes'
import axios from 'axios'
import axiosClient from './config/axiosClient'
import { TypeReturn } from 'interfaces/APIResponse'

const productsAPI = {
  async getProducts() {
    const response = await axios.get(API_URL + API_ROUTES.getProducts)

    return response.data.results
  },
  async createProduct(payload: CreateCmsProductPayload) {
    const response = await axiosClient.post(API_ROUTES.createProduct, payload)

    return response
  },
  async updateProduct(id: string, payload: CreateCmsProductPayload) {
    const response = await axiosClient.put(API_ROUTES.updateProduct + id, payload)

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

export default productsAPI
