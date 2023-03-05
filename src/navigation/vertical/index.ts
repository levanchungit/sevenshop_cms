// ** Icon imports
import {
  Login,
  Table,
  CubeOutline,
  CartOutline,
  AccountOutline,
  TruckOutline,
  HomeOutline,
  FormatLetterCase,
  AccountPlusOutline,
  TuneVariant,
  CreditCardOutline,
  AlertCircleOutline,
  GoogleCirclesExtended,
  ChartBoxOutline
} from 'mdi-material-ui'

// ** Type import
import { VerticalNavItemsType } from '@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Orders',
      icon: CartOutline,
      path: '/orders'
    },
    {
      title: 'Reports',
      icon: ChartBoxOutline,
      path: '/'
    },
    {
      title: 'Products',
      icon: ChartBoxOutline,
      path: '/products'
    },
    {
      title: 'Customers',
      icon: AccountOutline,
      path: '/'
    },
    {
      title: 'Shipping',
      icon: TruckOutline,
      path: '/'
    },
    {
      title: 'Payments',
      icon: CreditCardOutline,
      path: '/'
    },
    {
      title: 'Configurations',
      icon: TuneVariant,
      path: '/'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
