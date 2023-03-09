// ** React Import
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Type Import
import { Settings } from '@core/context/settingsContext'

// ** Configs
import themeConfig from 'configs/themeConfig'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
  verticalNavMenuBranding?: (props?: any) => ReactNode
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  // ** Hooks

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href='/' passHref>
          <StyledLink>
            <svg width='30' height='26' viewBox='0 0 30 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M15.8909 3.85465C15.6078 3.93375 15.3088 3.9733 14.9993 3.9733C13.7557 3.9733 12.6656 3.30361 12.0756 2.30699C11.7793 1.80605 11.6073 1.21809 11.6073 0.593227C11.6073 0.42976 11.5411 0.282113 11.4327 0.174014C11.3242 0.065915 11.176 0 11.012 0H0.984252C0.441855 0 0 0.43767 0 0.980801V7.76995C0 8.31308 0.441855 8.75075 0.984252 8.75075H6.4532C7.12524 8.75075 7.30251 9.1146 7.08555 9.74737L0.444501 24.4884C0.224896 25.1212 0.695855 25.7777 1.3679 25.7777L7.33691 25.7619C7.39512 25.7619 7.51153 25.7619 7.51153 25.7619C7.51418 25.7619 7.51418 25.7619 7.51418 25.7619C7.59885 25.7619 7.68352 25.7645 7.77083 25.7645L16.2613 6.21438V3.73337C16.1423 3.78083 16.0179 3.82038 15.8909 3.85465ZM29.8847 21.5882C29.7419 20.7761 29.6413 20.4887 29.2736 19.7452C28.8211 18.833 28.3396 18.216 28.0776 17.8601C27.776 17.4461 26.6727 15.9828 26.3102 15.5794C25.6408 14.8412 26.1515 15.3474 24.683 13.9606L24.2094 13.544L23.1643 12.6133C22.7198 12.2468 22.2621 11.9014 21.8017 11.5561C21.508 11.3346 21.1297 11.0736 20.7566 10.7308C20.3835 10.3881 20.1692 10.0189 20.3042 9.55754C20.4338 9.10932 20.8783 8.76393 21.2329 8.58201C21.6588 8.36318 23.0664 8.24189 23.5797 8.24189H28.0247C28.792 8.24189 29.4138 7.61967 29.4138 6.85506V1.41583C29.4138 0.632776 28.7788 0 27.9956 0H18.9892C18.6611 0 18.3912 0.266293 18.3912 0.593227C18.3912 1.37365 18.1266 2.09079 17.6821 2.66293C17.571 2.8053 17.4493 2.93713 17.3197 3.06105L17.2958 6.48858L17.272 6.53868L14.1103 13.8235C14.3775 14.1109 14.687 14.3719 14.9516 14.6224C15.2982 14.9467 15.6554 15.2314 16.1899 15.6454L16.5841 15.9934C16.7561 16.1516 17.0075 16.352 17.1186 16.4469C17.3805 16.6683 17.579 16.8213 17.7668 17.019C17.9494 17.2115 18.2325 17.5015 18.3251 17.9128C18.4256 18.3584 18.1187 18.7038 17.8912 18.8778C17.5313 19.1546 17.0604 19.2812 16.5841 19.2996H11.7316L8.92177 25.7724C9.4086 25.775 9.76843 25.7777 9.77637 25.7777H21.6721C22.8098 25.7777 24.2756 25.8146 25.2334 25.7935C26.2811 25.7724 27.2177 25.7487 27.9559 25.5588C28.6147 25.3875 29.0751 25.0183 29.2101 24.8839C29.6651 24.4383 29.8662 24.0059 29.9588 23.2202C30.0567 22.3923 29.9588 22.0021 29.8847 21.5882Z'
                fill='#AC1506'
              />
            </svg>

            <HeaderTitle variant='h6' sx={{ ml: 3 }}>
              {themeConfig.templateName}
            </HeaderTitle>
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
