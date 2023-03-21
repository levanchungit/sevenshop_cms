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
  cmsOrderCreate: `/orders/create`,
  cmsOrderEdit: `/orders/[order_id]/edit`,

  //Category
  cmsCategories: `/categories`,
  cmsCategoryCreate: `/categories/create`,
  cmsCategoryEdit: `/categories/[category_id]/edit`,

  //Color
  cmsColors: `/colors`,
  cmsColorCreate: `/colors/create`,
  cmsColorEdit: `/colors/[color_id]/edit`,

  //Category
  cmsSizes: `/sizes`,
  cmsSizeCreate: `/sizes/create`,
  cmsSizeEdit: `/sizes/[size_id]/edit`,

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

export type IModify = {
  action: string
  date: string
}

export type IStock = {
  _id: string
  size_id: string
  color_id: string
  quantity: number
}

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

export type IProductCart = {
  _id: string
  product_id: string
  quantity: number
  size_id: string
  color_id: string
}

export type IProductOrder = IProductCart & {
  total_before_discount: number | undefined
  total_discount: number | undefined
  total: number | undefined
}

export enum STATUS_ORDER {
  pending = 'pending',
  verified = 'verified',
  shipping = 'shipping',
  completed = 'completed',
  cancel = 'cancel'
}

export const STATUS_ORDER_OPTIONS = [
  { value: STATUS_ORDER.pending, label: 'Pending' },
  { value: STATUS_ORDER.verified, label: 'Verified' },
  { value: STATUS_ORDER.shipping, label: 'Shipping' },
  { value: STATUS_ORDER.completed, label: 'Completed' },
  { value: STATUS_ORDER.cancel, label: 'Cancel' }
]

export enum PAYMENT_TYPE {
  cod = 'cod',
  momo = 'momo',
  bank = 'bank'
}
