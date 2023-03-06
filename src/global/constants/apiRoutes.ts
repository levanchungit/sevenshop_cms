export const API_ROUTES = {
  // auth
  login: `/user/login`,
  logout: `/user/logout`,
  register: `/user/register`,
  check_otp: `/user/check_otp`,
  set_password: `/user/set_password`,
  refresh_token: `/user/refresh_token`,
  me: `/user/me`,

  // product
  getProducts: `/product/`,
  getCategories: `/meta_data/getDetailByMetaDataId/`,
  createProduct: `/product/createProduct`
}
export default API_ROUTES
