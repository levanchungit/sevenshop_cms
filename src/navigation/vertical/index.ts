// ** Icon imports
import {
  Login,
  Table,
  CubeOutline,
  CartOutline,
  AccountOutline,
  TruckOutline,
  FormatLetterCase,
  AccountPlusOutline,
  TuneVariant,
  CreditCardOutline,
  AlertCircleOutline,
  GoogleCirclesExtended,
  ChartBoxOutline
} from 'mdi-material-ui'

import DashboardIcon from '@mui/icons-material/Dashboard'
import ViewInArIcon from '@mui/icons-material/ViewInAr'

// ** Type import
import { VerticalNavItemsType } from '@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: DashboardIcon,
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
      icon: ViewInArIcon,
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
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    }
  ]
}

export default navigation
