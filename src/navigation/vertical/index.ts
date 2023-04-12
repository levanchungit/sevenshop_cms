import { APP_ROUTES } from 'global/constants/index'

// ** Icon imports
import { CartOutline, AccountOutline, CreditCardOutline, ChartBoxOutline } from 'mdi-material-ui'

import DashboardIcon from '@mui/icons-material/Dashboard'
import ViewInArIcon from '@mui/icons-material/ViewInAr'
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import FormatSizeOutlinedIcon from '@mui/icons-material/FormatSizeOutlined'

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
      path: APP_ROUTES.cmsChart
    },
    {
      title: 'Products',
      icon: ViewInArIcon,
      path: APP_ROUTES.cmsProducts
    },
    {
      title: 'Customers',
      icon: AccountOutline,
      path: APP_ROUTES.cmsCustomers
    },
    {
      title: 'Vouchers',
      icon: CreditCardOutline,
      path: APP_ROUTES.cmsVouchers
    },
    {
      title: 'Payments',
      icon: CreditCardOutline,
      path: APP_ROUTES.cmsPayments
    },
    {
      sectionTitle: 'Properties'
    },

    {
      title: 'Categories',
      icon: CategoryOutlinedIcon,
      path: APP_ROUTES.cmsCategories
    },
    {
      title: 'Colors',
      icon: ColorLensOutlinedIcon,
      path: APP_ROUTES.cmsColors
    },
    {
      title: 'Sizes',
      icon: FormatSizeOutlinedIcon,
      path: APP_ROUTES.cmsSizes
    }
  ]
}

export default navigation
