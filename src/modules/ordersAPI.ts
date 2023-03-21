import { EditCmsOrderPayload } from 'interfaces/Order'
import { API_ROUTES } from 'global/constants/apiRoutes'
import axiosClient from './config/axiosClient'

const productsAPI = {
  async getOrders() {
    const response = await axiosClient.get(API_ROUTES.getOrders + '?limit=1000')

    return response.data.results
  },
  async updateOrder(payload: EditCmsOrderPayload) {
    const response = await axiosClient.put(API_ROUTES.updateOrder + payload._id, payload)

    return response
  },
  getOrderDetail(id: string) {
    const response = axiosClient.get(API_ROUTES.getOrderDetail + id)

    return response
  }
}

export default productsAPI
