import { CreateCmsCategoryPayload } from 'interfaces/Category'
import { API_URL } from 'global/config'
import { API_ROUTES } from 'global/constants/apiRoutes'
import axios from 'axios'
import axiosClient from './config/axiosClient'

const categoriesAPI = {
  async getCategories() {
    const response = await axios.get(API_URL + API_ROUTES.getCategories)

    return response.data.results
  },

  async createCategory(payload: CreateCmsCategoryPayload) {
    const response = await axiosClient.post(API_ROUTES.createCategory, payload)

    return response
  }
}

export default categoriesAPI
