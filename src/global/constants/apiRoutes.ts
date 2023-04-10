export const API_ROUTES = {
  // auth
  login: `/auth/login`,
  logout: `/auth/logout`,
  check_otp: `/auth/check_otp`,
  set_password: `/auth/set_password`,
  refresh_token: `/auth/refresh_token`,
  me: `/auth/me`,

  // product
  getProducts: `/products`,
  getProductDetail: `/products/`,
  createProduct: `/products/`,
  updateProduct: `/products/`,
  deleteProduct: (id: string) => `/products/${id}`,
  generateStock: `/products/generate_stock/`,

  //categories
  getCategories: `/categories`,
  getCategoryDetail: `/categories/`,
  createCategory: `/categories/`,
  updateCategory: `/categories/`,
  deleteCategory: (id: string) => `/categories/${id}`,

  //colors
  getColors: `/colors`,
  getColorDetail: `/colors/`,
  createColor: `/colors/`,
  updateColor: `/colors/`,
  deleteColor: (id: string) => `/colors/${id}`,

  //sizes
  getSizes: `/sizes`,
  getSizeDetail: `/sizes/`,
  createSize: `/sizes/`,
  updateSize: `/sizes/`,
  deleteSize: (id: string) => `/sizes/${id}`,

  //sizes
  getUsers: `/users`,
  getUserDetail: `/users/`,
  createUser: `/users/`,
  updateUser: `/users/`,
  deleteUser: (id: string) => `/users/${id}`,

  // order
  getOrders: `/orders`,
  getOrderDetail: `/orders/get/`,
  updateOrder: `/orders/`,
  updateStatusOrder: `/orders/`,

  //upload
  single: `/upload/single`,
  multiple: `/upload/multiple`,

  //dashboard
  getRevenue: `/dashboard/revenue_day`,
  getCountQuantity: `/dashboard/count_quantity`,
  getHistorySearch: `/dashboard/get_history_search`,
  getProductsBestSellers: `/dashboard/get_products_best_seller`,
  getFeed: `/dashboard/get_feed`
}
export default API_ROUTES
