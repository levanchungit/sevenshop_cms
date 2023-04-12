import { API_ROUTES } from 'global/constants'
import axiosClient from './config/axiosClient'

const dashboardAPI = {
  getRevenue(url: string) {
    return axiosClient.get(url)
  },
  async getCountQuantity() {
    const response = await axiosClient.get(API_ROUTES.getCountQuantity)

    return response.data
  },
  async getHistorySearch() {
    const response = await axiosClient.get(API_ROUTES.getHistorySearch)

    return response.data
  },
  async getProductsBestSellers() {
    const response = await axiosClient.get(API_ROUTES.getProductsBestSellers)

    return response.data
  },
  async getFeed() {
    const response = await axiosClient.get(API_ROUTES.getFeed)

    return response.data
  },
  async getTransaction() {
    const response = await axiosClient.get(API_ROUTES.getTransactions)

    return response.data.data
  }
}

export default dashboardAPI
