import { APP_ROUTES } from 'global/constants/index'
import { API_ROUTES } from './../../global/constants/apiRoutes'
import axios, { AxiosInstance } from 'axios'
import { API_URL } from 'global/config'
import Router from 'next/router'

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
      console.log('refresh_token', refresh_token)
      if (error.response.status === 401 && originalRequest.url !== API_ROUTES.refresh_token) {
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

          // Router.push(APP_ROUTES.cmsLogin)

          return Promise.reject(error)
        }
      } else if (error.response.status === 400 && originalRequest.url !== API_ROUTES.refresh_token) {
        //Refresh token hết hạn
        Router.push(APP_ROUTES.cmsLogin)
      }

      return Promise.reject(error)
    }
  )

  // // Thêm interceptor để tự động thêm Authorization header vào mỗi request
  // axiosClient.interceptors.request.use(async config => {
  //   try {
  //     const access_token = Cookies.get('access_token')
  //     console.log('access_token', access_token)
  //     if (access_token) {
  //       config.headers.Authorization = `Bearer ${access_token}`
  //     }

  //     return config
  //   } catch (error) {
  //     throw new Error('Failed to add Authorization header to request')
  //   }
  // })

  // // Thêm interceptor để xử lý lỗi authentication và refresh token
  // axiosClient.interceptors.response.use(
  //   response => {
  //     return response
  //   },
  //   async error => {
  //     try {
  //       const originalRequest = error.config
  //       const refresh_token = Cookies.get('refresh_token')
  //       console.log('refresh_token', refresh_token)
  //       if (error.response.status === 401 && originalRequest.url !== API_ROUTES.refresh_token) {
  //         // Gửi request mới để lấy access token mới
  //         const response = await axios.post(API_URL + API_ROUTES.refresh_token, { refresh_token })
  //         console.log(response)
  //         const access_token = response.data.access_token
  //         Cookies.set('access_token', access_token, { httpOnly: true, secure: true })

  //         // Sử dụng access token mới để gửi lại request cũ
  //         originalRequest.headers.Authorization = `Bearer ${access_token}`

  //         return axios(originalRequest)
  //       } else if (error.response.status === 400 && originalRequest.url !== API_ROUTES.refresh_token) {
  //         //Refresh token hết hạn
  //         Router.push(APP_ROUTES.cmsLogin)
  //       }
  //       throw new Error(error.message)
  //     } catch (error) {
  //       throw new Error('Failed to handle authentication or refresh token error')
  //     }
  //   }
  // )

  return axiosClient
}

export default createAxiosClient()
