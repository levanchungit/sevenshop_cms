import { API_ROUTES } from 'global/constants/apiRoutes'
import axiosClient from './config/axiosClient'

const revenueAPI = {
  getRevenue(status: string) {
    return axiosClient.get(API_ROUTES.getRevenue + `?status=${status}`)
  }
}

export default revenueAPI
