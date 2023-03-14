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
  getProductDetail: (id: string) => `/products/${id}`,
  createProduct: `/products/`,
  updateProduct: `/products/:id`,
  deleteProduct: (id: string) => `/products/${id}`,
  generateStock: `/generate_stock/:id`,

  //categories
  getCategories: `/categories`,
  getCategoryDetail: (id: string) => `/categories/${id}`,
  createCategory: `/categories/`,
  updateCategory: `/categories/:id`,
  deleteCategory: (id: string) => `/categories/${id}`,

  //colors
  getColors: `/colors`,

  //sizes
  getSizes: `/sizes`
}
export default API_ROUTES
