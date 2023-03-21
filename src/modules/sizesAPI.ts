import { API_URL } from 'global/config'
import { API_ROUTES } from 'global/constants/apiRoutes'
import axios from 'axios'
import axiosClient from './config/axiosClient'
import { CreateCmsSizePayload, EditCmsSizePayload } from 'interfaces/Size'

const authAPI = {
  async getSizes() {
    const response = await axios.get(API_URL + API_ROUTES.getSizes)

    return response.data.results
  },
  getSizeDetail(id: string) {
    const response = axiosClient.get(API_ROUTES.getSizeDetail + id)

    return response
  },

  async createSize(payload: CreateCmsSizePayload) {
    const response = await axiosClient.post(API_ROUTES.createSize, payload)

    return response
  },
  async updateSize(payload: EditCmsSizePayload) {
    const response = await axiosClient.put(API_ROUTES.updateSize + payload._id, payload)

    return response
  },
  async deleteSize(id: string) {
    const response = await axiosClient.delete(API_ROUTES.deleteSize(id))

    return response
  }
}

export default authAPI
