// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect, useContext } from 'react'

// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import Router from 'next/router'
import { authAPI } from 'modules'
import { GetMeSuccessData } from 'interfaces/Auth'
import { SettingsContext } from '@core/context/settingsContext'
import { APP_ROUTES } from 'global/constants/index'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [info, setInfo] = useState<GetMeSuccessData>()
  const { setSnackbarAlert } = useContext(SettingsContext)

  useEffect(() => {
    getMe()
  }, [])

  const getMe = async () => {
    try {
      const response = await authAPI.me()
      setSnackbarAlert({ message: response.data.message, severity: 'success' })
      setInfo(response.data.result)
    } catch (e: any) {
      console.log(e)
      setSnackbarAlert({ message: e?.response.data.message, severity: 'error' })
    }
  }

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const onLogout = async () => {
    try {
      const response = await authAPI.logout()
      setSnackbarAlert({ message: response.data.message, severity: 'success' })

      handleDropdownClose('/login')
    } catch (e: any) {
      setSnackbarAlert({ message: e.response.data.message, severity: 'error' })
    }
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      Router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar alt='John Doe' onClick={handleDropdownOpen} sx={{ width: 40, height: 40 }} src={info?.avatar} />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar alt='John Doe' src={info?.avatar} sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ width: '100%', fontWeight: 600 }}>
                {info?.email && info.email.length > 14 ? info.email.slice(0, 14) + '...' : info?.email}
              </Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {info?.role}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => {
            Router.push(APP_ROUTES.cmsAccountSettings)
            handleDropdownClose()
          }}
        >
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            Profile
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <EmailOutline sx={{ marginRight: 2 }} />
            Inbox
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <MessageOutline sx={{ marginRight: 2 }} />
            Chat
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 2 }} />
            Settings
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Pricing
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            FAQ
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={onLogout}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
