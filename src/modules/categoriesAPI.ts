import { CreateCmsCategoryPayload, EditCmsCategoryPayload } from 'interfaces/Category'
import { API_URL } from 'global/config'
import { API_ROUTES } from 'global/constants/apiRoutes'
import axios from 'axios'
import axiosClient from './config/axiosClient'

const categoriesAPI = {
  async getCategories() {
    const response = await axios.get(API_URL + API_ROUTES.getCategories)

    return response.data.results
  },

  getCategoryDetail(id: string) {
    const response = axiosClient.get(API_ROUTES.getCategoryDetail + id)

    return response
  },

  async createCategory(payload: CreateCmsCategoryPayload) {
    const response = await axiosClient.post(API_ROUTES.createCategory, payload)

    return response
  },
  async updateCategory(payload: EditCmsCategoryPayload) {
    const response = await axiosClient.put(API_ROUTES.updateCategory + payload._id, payload)

    return response
  },
  async deleteCategory(id: string) {
    const response = await axiosClient.delete(API_ROUTES.deleteCategory(id))

    return response
  }
}

export default categoriesAPI
