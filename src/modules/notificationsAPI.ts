import { API_ROUTES } from 'global/constants/apiRoutes'
import { CreateCmsNotificationPayload } from 'interfaces/Notification'
import axiosClient from './config/axiosClient'

const notificationsAPI = {
  async getNotifications() {
    const response = await axiosClient.get(API_ROUTES.getNotifications)

    return response.data.results
  },
  async pushNotification(payload: CreateCmsNotificationPayload) {
    const response = await axiosClient.post(API_ROUTES.pushNotifications, payload)

    return response
  }
}

export default notificationsAPI
