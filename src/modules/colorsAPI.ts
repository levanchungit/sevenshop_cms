import { API_URL } from 'global/config'
import { API_ROUTES } from 'global/constants/apiRoutes'
import axios from 'axios'
import axiosClient from './config/axiosClient'
import { CreateCmsColorPayload, EditCmsColorPayload } from 'interfaces/Color'

const authAPI = {
  async getColors() {
    const response = await axios.get(API_URL + API_ROUTES.getColors)

    return response.data.results
  },
  getColorDetail(id: string) {
    const response = axiosClient.get(API_ROUTES.getColorDetail + id)

    return response
  },

  async createColor(payload: CreateCmsColorPayload) {
    const response = await axiosClient.post(API_ROUTES.createColor, payload)

    return response
  },
  async updateColor(payload: EditCmsColorPayload) {
    const response = await axiosClient.put(API_ROUTES.updateColor + payload._id, payload)

    return response
  },
  async deleteColor(id: string) {
    const response = await axiosClient.delete(API_ROUTES.deleteColor(id))

    return response
  }
}

export default authAPI
