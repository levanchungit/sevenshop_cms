import { authAPI } from 'modules'
import { APP_ROUTES } from 'global/constants/index'
import { API_ROUTES } from './../../global/constants/apiRoutes'
import axios, { AxiosInstance } from 'axios'
import { API_URL } from 'global/config'
import Router from 'next/router'
import axiosAuthRefresh from 'axios-auth-refresh'

function createAxiosClient(): AxiosInstance {
  const axiosClient = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
  })

  // Thêm interceptor để tự động thêm Authorization header vào mỗi request
  axiosClient.interceptors.request.use(
    config => {
      const access_token = localStorage.getItem('access_token')
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`
      }

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // Sử dụng hàm setupAuthRefresh để xử lý việc refresh token và cập nhật header Authorization cho các request
  axiosAuthRefresh(axiosClient, async (failedRequest: any) => {
    const originalRequest = failedRequest.config
    const refresh_token = localStorage.getItem('refresh_token')
    if (originalRequest.url === API_ROUTES.refresh_token || !refresh_token) {
      // Không thể refresh token hoặc đã ở trang refresh token, không thực hiện lại request
      return Promise.reject(failedRequest)
    }

    // Gửi request mới để lấy access token mới
    try {
      const response = await authAPI.refresh_Token({ refresh_token })
      const access_token = response.data.access_token
      localStorage.setItem('access_token', access_token)

      // Cập nhật header Authorization với access token mới
      originalRequest.headers.Authorization = `Bearer ${access_token}`

      // Thực hiện lại request
      return axiosClient(originalRequest)
    } catch (error) {
      // Xóa các token nếu refresh token bị lỗi
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      Router.push(APP_ROUTES.cmsLogin)

      return Promise.reject(error)
    }
  })

  return axiosClient
}

export default createAxiosClient()
