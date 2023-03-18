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
  getCategoryDetail: (id: string) => `/categories/${id}`,
  createCategory: `/categories/`,
  updateCategory: `/categories/:id`,
  deleteCategory: (id: string) => `/categories/${id}`,

  //colors
  getColors: `/colors`,

  //sizes
  getSizes: `/sizes`,

  //upload
  single: `/upload/single`,
  multiple: `/upload/multiple`
}
export default API_ROUTES
