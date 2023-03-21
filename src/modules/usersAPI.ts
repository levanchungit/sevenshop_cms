import axios from 'axios'
import { API_URL } from 'global/config'
import { API_ROUTES } from 'global/constants/apiRoutes'
import { CreateCmsUserPayload, EditCmsUserPayload } from 'interfaces/User'
import axiosClient from './config/axiosClient'

const usersAPI = {
  async getUsers() {
    const response = await axios.get(API_URL + API_ROUTES.getUsers)

    return response.data.results
  },
  getUserDetail(id: string) {
    const response = axiosClient.get(API_ROUTES.getUserDetail + id)

    return response
  },

  async createUser(payload: CreateCmsUserPayload) {
    const response = await axiosClient.post(API_ROUTES.createUser, payload)

    return response
  },
  async updateUser(payload: EditCmsUserPayload) {
    const response = await axiosClient.put(API_ROUTES.updateUser + payload._id, payload)

    return response
  },
  async deleteUser(id: string) {
    const response = await axiosClient.delete(API_ROUTES.deleteUser(id))

    return response
  }
}

export default usersAPI
