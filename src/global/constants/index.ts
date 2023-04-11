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
  cmsCustomers: `/users`,
  cmsCustomerCreate: `/users/create`,
  cmsCustomerEdit: `/users/[user_id]/edit`,

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

  //Voucher
  cmsVouchers: `/vouchers`,
  cmsVoucherCreate: `/vouchers/create`,
  cmsVoucherEdit: `/vouchers/[voucher_id]/edit`,

  //Payment
  cmsPayments: `/payments`,
  cmsPaymentCreate: `/payments/create`,
  cmsPaymentEdit: `/payments/[payment_id]/edit`,

  //Notification
  cmsNotifications: `/`,
  cmsNotificationCreate: `/`,

  //Chart
  cmsChart: `/chart`,

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
  size_id: {
    _id: string
    size: string
  }
  color_id: {
    _id: string
    name: string
    code: string
  }
  quantity: number
}

export enum GENDER {
  male = 'male',
  female = 'female',
  other = 'other'
}

export const GENDER_OPTIONS = [
  { value: GENDER.female, label: 'Female' },
  { value: GENDER.male, label: 'Male' },
  { value: GENDER.other, label: 'Other' }
]

export enum STATUS_USER {
  active = 'active',
  inactive = 'inactive',
  pending = 'pending'
}

export const STATUS_USER_OPTIONS = [
  { value: STATUS_USER.active, label: 'Active' },
  { value: STATUS_USER.inactive, label: 'Inactive' },
  { value: STATUS_USER.pending, label: 'Pending' }
]

export enum ROLE {
  user = 'user',
  admin = 'admin',
  staff = 'staff'
}

export const ROLE_OPTIONS = [
  { value: ROLE.user, label: 'User' },
  { value: ROLE.admin, label: 'Admin' },
  { value: ROLE.staff, label: 'Staff' }
]

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
  rated = 'rated',
  cancelled = 'cancelled'
}

export const STATUS_ORDER_OPTIONS = [
  { value: STATUS_ORDER.pending, label: 'Pending' },
  { value: STATUS_ORDER.verified, label: 'Verified' },
  { value: STATUS_ORDER.shipping, label: 'Shipping' },
  { value: STATUS_ORDER.completed, label: 'Completed' },
  { value: STATUS_ORDER.rated, label: 'Rated' },
  { value: STATUS_ORDER.cancelled, label: 'Cancelled' }
]

export enum PAYMENT_TYPE {
  cod = 'cod',
  momo = 'momo',
  bank = 'bank'
}

export const STATUS_PAYMENT_OPTIONS = [
  { value: PAYMENT_TYPE.cod, label: 'Cash on delivery' },
  { value: PAYMENT_TYPE.momo, label: 'Momo' },
  { value: PAYMENT_TYPE.bank, label: 'Bank' }
]

export type IModifyOrder = {
  status: STATUS_ORDER
  modify_at: string
  modify_by: string
}
