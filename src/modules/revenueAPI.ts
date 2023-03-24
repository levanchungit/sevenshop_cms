import axiosClient from './config/axiosClient'

const revenueAPI = {
  getRevenue(url: string) {
    return axiosClient.get(url)
  }
}

export default revenueAPI
