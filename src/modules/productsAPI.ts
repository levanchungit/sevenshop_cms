import { CreateCmsProductPayload, EditCmsProductPayload } from 'interfaces/Product'
import { API_URL } from 'global/config'
import { API_ROUTES } from 'global/constants/apiRoutes'
import axios from 'axios'
import axiosClient from './config/axiosClient'

const productsAPI = {
  async getProducts() {
    const response = await axios.get(API_URL + API_ROUTES.getProducts)

    return response.data.results
  },
  async createProduct(payload: CreateCmsProductPayload) {
    const response = await axiosClient.post(API_ROUTES.createProduct, payload)

    return response
  },
  async updateProduct(payload: EditCmsProductPayload) {
    const response = await axiosClient.put(API_ROUTES.updateProduct + payload._id, payload)

    return response
  },
  async deleteProduct(id: string) {
    const response = await axiosClient.delete(API_ROUTES.deleteProduct(id))

    return response
  },
  getProductDetail(id: string) {
    const response = axiosClient.get(API_ROUTES.getProductDetail + id)

    return response
  },
  async generateStock(id: string) {
    const response = await axiosClient.get(API_ROUTES.generateStock + id)

    return response
  }
}

export default productsAPI
