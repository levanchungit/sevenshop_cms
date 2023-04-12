import { API_ROUTES } from 'global/constants/apiRoutes'
import { CreateCmsVoucherPayload, EditCmsVoucherPayload } from 'interfaces/Voucher'
import axiosClient from './config/axiosClient'

const vouchersAPI = {
  async getVouchers() {
    const response = await axiosClient.get(API_ROUTES.getVouchers)

    return response.data.results
  },
  getVoucherDetail(id: string) {
    const response = axiosClient.get(API_ROUTES.getVoucherDetail + id)

    return response
  },

  async createVoucher(payload: CreateCmsVoucherPayload) {
    const response = await axiosClient.post(API_ROUTES.createVoucher, payload)

    return response
  },
  async updateVoucher(payload: EditCmsVoucherPayload) {
    const response = await axiosClient.put(API_ROUTES.updateVoucher + payload._id, payload)

    return response
  },
  async deleteVoucher(id: string) {
    const response = await axiosClient.delete(API_ROUTES.deleteVoucher(id))

    return response
  }
}

export default vouchersAPI
