// ** React Imports
import { MouseEvent, ReactNode, useState, useContext } from 'react'

// ** Next Imports
import Router from 'next/router'

// ** MUI Components
import {
  Box,
  Checkbox,
  TextField,
  InputLabel,
  Typography,
  IconButton,
  CardContent,
  FormControl,
  OutlinedInput,
  InputAdornment
} from '@mui/material'

import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'configs/themeConfig'

// ** Layout Import
import BlankLayout from '@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'views/pages/auth/FooterIllustration'
import { authAPI } from 'modules'
import { SignInPayload } from 'interfaces/Auth'
import { SettingsContext } from '@core/context/settingsContext'
import { APP_ROUTES } from 'global/constants/index'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  const { setSnackbarAlert } = useContext(SettingsContext)
  const [passwordVisible, setPasswordVisible] = useState(true)
  const [formData, setFormData] = useState<SignInPayload>({
    email: 'levanchunq123@gmail.com',
    password: '123456'
  })
  const [btnLoginLoading, setBtnLoginLoading] = useState(false)

  const onSubmit = async () => {
    setBtnLoginLoading(true)
    try {
      const response = await authAPI.login(formData)
      console.log(response)

      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      setSnackbarAlert({ message: response.data.message, severity: 'success' })
      Router.push(APP_ROUTES.cmsDoashboard)
    } catch (e: any) {
      setSnackbarAlert({ message: e?.response.data.message, severity: 'error' })
    }
    setBtnLoginLoading(false)
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width='48' height='42' viewBox='0 0 48 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M25.4254 6.16745C24.9725 6.294 24.4941 6.35728 23.9988 6.35728C22.0091 6.35728 20.265 5.28578 19.321 3.69119C18.8468 2.88967 18.5717 1.94895 18.5717 0.949162C18.5717 0.687615 18.4658 0.451381 18.2923 0.278423C18.1187 0.105464 17.8816 0 17.6192 0H1.5748C0.706969 0 0 0.700271 0 1.56928V12.4319C0 13.3009 0.706969 14.0012 1.5748 14.0012H10.3251C11.4004 14.0012 11.684 14.5834 11.3369 15.5958L0.711201 39.1814C0.359834 40.1939 1.11337 41.2443 2.18864 41.2443L11.7391 41.219C11.8322 41.219 12.0185 41.219 12.0185 41.219C12.0227 41.219 12.0227 41.219 12.0227 41.219C12.1582 41.219 12.2936 41.2232 12.4333 41.2232L26.0181 9.943V5.9734C25.8276 6.04933 25.6287 6.11261 25.4254 6.16745ZM47.8156 34.5411C47.587 33.2418 47.4261 32.782 46.8377 31.5923C46.1138 30.1327 45.3433 29.1456 44.9242 28.5761C44.4416 27.9138 42.6763 25.5725 42.0963 24.9271C41.0253 23.7459 41.8423 24.5559 39.4928 22.337L38.7351 21.6704L37.0629 20.1813C36.3517 19.5949 35.6193 19.0423 34.8827 18.4897C34.4128 18.1353 33.8075 17.7177 33.2106 17.1693C32.6137 16.6209 32.2708 16.0303 32.4867 15.2921C32.6941 14.5749 33.4053 14.0223 33.9726 13.7312C34.6541 13.3811 36.9063 13.187 37.7275 13.187H44.8396C46.0672 13.187 47.0621 12.1915 47.0621 10.9681V2.26534C47.0621 1.01244 46.0461 0 44.793 0H30.3827C29.8578 0 29.426 0.426068 29.426 0.949162C29.426 2.19784 29.0026 3.34527 28.2914 4.26068C28.1136 4.48848 27.9189 4.69941 27.7115 4.89768L27.6734 10.3817L27.6353 10.4619L22.5764 22.1176C23.004 22.5774 23.4993 22.995 23.9226 23.3958C24.4772 23.9147 25.0487 24.3703 25.9038 25.0326L26.5346 25.5894C26.8097 25.8425 27.2119 26.1631 27.3897 26.315C27.8088 26.6694 28.1263 26.914 28.4269 27.2304C28.719 27.5384 29.172 28.0024 29.3201 28.6605C29.481 29.3734 28.9899 29.926 28.6259 30.2045C28.0501 30.6474 27.2966 30.8499 26.5346 30.8794H18.7706L14.2748 41.2358C15.0538 41.2401 15.6295 41.2443 15.6422 41.2443H34.6753C36.4956 41.2443 38.8409 41.3033 40.3734 41.2696C42.0498 41.2358 43.5484 41.1979 44.7295 40.8941C45.7836 40.6199 46.5202 40.0293 46.7361 39.8142C47.4642 39.1013 47.786 38.4094 47.9341 37.1523C48.0908 35.8277 47.9341 35.2034 47.8156 34.5411Z'
                  fill='#AC1506'
                />
              </svg>
              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Welcome to {themeConfig.templateName}! 👋🏻
              </Typography>
              <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
              <TextField
                value={formData.email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, email: event.target.value })
                }
                autoFocus
                fullWidth
                id='email'
                label='Email'
                sx={{ marginBottom: 4 }}
              />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={formData.password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, password: event.target.value })
                  }
                  id='auth-login-password'
                  type={!passwordVisible ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {!passwordVisible ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box
                sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                <FormControlLabel control={<Checkbox />} label='Remember Me' />
              </Box>

              <LoadingButton
                size='large'
                fullWidth
                sx={{ marginBottom: 7 }}
                onClick={onSubmit}
                loading={btnLoginLoading}
                loadingIndicator='Loading…'
                variant='contained'
              >
                Login
              </LoadingButton>
              {/* <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} onClick={onSubmit}>
                Login
              </Button> */}
            </form>
          </CardContent>
        </Card>
        <FooterIllustrationsV1 />
      </Box>
    </>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
