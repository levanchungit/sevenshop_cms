import { API_ROUTES } from 'global/constants/apiRoutes'
import axiosClient from './config/axiosClient'

const uploadAPI = {
  async single(file: any) {
    const response = await axiosClient.post(API_ROUTES.single, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response
  },
  async multiple(files: any) {
    const response = await axiosClient.post(API_ROUTES.multiple, files, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response
  }
}

export default uploadAPI
