import { APP_ROUTES } from 'global/constants/index'

// ** Icon imports
import {
  CartOutline,
  AccountOutline,
  TruckOutline,
  TuneVariant,
  CreditCardOutline,
  AlertCircleOutline,
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
      path: APP_ROUTES.cmsDoashboard
    },
    {
      title: 'Orders',
      icon: CartOutline,
      path: APP_ROUTES.cmsOrders
    },
    {
      title: 'Reports',
      icon: ChartBoxOutline,
      path: '/'
    },
    {
      title: 'Products',
      icon: ViewInArIcon,
      path: APP_ROUTES.cmsProducts
    },
    {
      title: 'Categories',
      icon: ViewInArIcon,
      path: APP_ROUTES.cmsCategories
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
      path: APP_ROUTES.cmsError401,
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: APP_ROUTES.cmsCards
    }
  ]
}

export default navigation
