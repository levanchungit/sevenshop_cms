export * from './apiRoutes'

export const APP_ROUTES = {
  //Auth
  cmsLogin: `/login`,
  cmsRegister: `/register`,

  cmsDoashboard: `/`,
  cmsCards: `/cards`,
  cmsFormLayouts: `/form-layouts`,
  cmsTables: `/tables`,

  //User
  cmsAccountSettings: `/account-settings`,

  //Product
  cmsProducts: `/products`,
  cmsProductCreate: `/products/create`,
  cmsProductEdit: `/products/[product_id]/edit`,

  //Order
  cmsOrders: `/orders`,

  //Category
  cmsCategories: `/categories`,
  cmsCategoryCreate: `/categories/create`,
  cmsCategoryEdit: `/categories/[category_id]/edit`,

  //Erro
  cmsError401: `/401`,
  cmsError404: `/404`,
  cmsError500: `/500`
}

export enum STATUS_PRODUCT {
  active = 'active',
  inactive = 'inactive'
}

export enum FORM_TYPES {
  create = 'create',
  edit = 'edit'
}
