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

export const STATUS_PRODUCT_OPTIONS = [
  { value: STATUS_PRODUCT.active, label: 'Active' },
  { value: STATUS_PRODUCT.inactive, label: 'Inactive' }
]

export enum GENDER {
  male = 'male',
  female = 'female',
  other = 'other'
}

export enum STATUS_USER {
  active = 'active',
  inactive = 'inactive',
  pending = 'pending'
}

export enum ROLE {
  user = 'user',
  admin = 'admin',
  staff = 'staff'
}

export type IAddress = {
  _id?: string
  address: string
  full_name: string
  phone: string
  default_address: boolean
}

export type IOTP = {
  code: number | undefined
  exp: string
}

export type IMembership = {
  name: string
  description: string
  point: number
}

export type IVoucherUser = {
  voucher_id: string
  status: STATUS_VOUCHER_USER
}

export enum STATUS_VOUCHER_USER {
  used = 'used',
  unused = 'unused'
}

export enum TYPE_VOUCHER {
  percent = 'percent',
  money = 'money'
}
