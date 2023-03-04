import { useRouter } from 'next/router'
import { API_ROUTES } from './../../global/constants/apiRoutes'
import axios, { AxiosInstance } from 'axios'
import { API_URL } from 'global/config'

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

  // Thêm interceptor để xử lý lỗi authentication và refresh token
  axiosClient.interceptors.response.use(
    response => {
      return response
    },
    async error => {
      const originalRequest = error.config
      const refresh_token = localStorage.getItem('refresh_token')
      if (error.response.status === 401 && originalRequest.url !== API_ROUTES.refresh_token && refresh_token) {
        // Gửi request mới để lấy access token mới
        try {
          const response = await axios.post(API_URL + API_ROUTES.refresh_token, { refresh_token })
          const access_token = response.data.access_token
          localStorage.setItem('access_token', access_token)

          // Sử dụng access token mới để gửi lại request cũ
          originalRequest.headers.Authorization = `Bearer ${access_token}`

          return axios(originalRequest)
        } catch (error) {
          // Xóa các token nếu refresh token bị lỗi
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          useRouter().push('/login/')

          return Promise.reject(error)
        }
      }

      return Promise.reject(error)
    }
  )

  return axiosClient
}

export default createAxiosClient()
