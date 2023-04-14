import {
  TextField,
  Button,
  Typography,
  Grid,
  Divider,
  CardContent,
  CardActions,
  CircularProgress,
  Box,
  ButtonProps,
  MenuItem,
  Stack
} from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { useState, useContext, ElementType, ChangeEvent } from 'react'
import { useFormikCustom } from 'hook/lib'
import { GENDER_OPTIONS, ROLE_OPTIONS, STATUS_USER_OPTIONS } from 'global/constants/index'
import { InputField } from 'components/CustomFields'
import { usersAPI } from 'modules'
import { SettingsContext } from '@core/context/settingsContext'
import { styled } from '@mui/material/styles'
import uploadAPI from 'modules/uploadAPI'
import { CmsUser } from 'interfaces/User'

interface Props {
  initialValues: CmsUser
  mutate: any
}

const ImgStyled = styled('img')(({ theme }) => ({
  width: 600 / 5 - 25,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

export default function CMSUserFormEdit(props: Props) {
  const { initialValues, mutate } = props
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)

  const [images, setImages] = useState(initialValues.avatar)
  const [isLoadingImages, setIsLoadingImages] = useState(false)

  const formik = useFormikCustom({
    initialValues: {
      _id: initialValues._id,
      email: initialValues.email,
      full_name: initialValues.full_name,
      avatar: initialValues.avatar,
      phone: initialValues.phone,
      gender: initialValues.gender,
      status: initialValues.status,
      role: initialValues.role
    },
    validationSchema: yup.object().shape({
      email: yup.string().required(),
      full_name: yup.string().required(),
      avatar: yup.string().required(),
      phone: yup.string().required(),
      gender: yup.string().required(),
      status: yup.string().required(),
      role: yup.string().required()
    }),
    onSubmit: async (data, actions) => {
      console.log('onSubmit UPDATE', data)
      try {
        const response = await usersAPI.updateUser(data)
        if (response.status === 200) {
          setSnackbarAlert({ message: 'Update user successfully', severity: 'success' })
        }
        mutate()
      } catch (e: any) {
        setSnackbarAlert({ message: e?.response.data.message, severity: 'error' })
      } finally {
        actions.setSubmitting(false)
      }
    }
  })
  const { handleSubmit, getFieldPropsCustom, errors } = formik

  //errros have console.log
  console.log('Errors onSubmit', errors)

  const handleBack = () => {
    router.back()
  }

  const uploadImages = async (formData: any) => {
    try {
      const response = await uploadAPI.multiple(formData)

      setIsLoadingImages(false)

      return response.data.secure_urls
    } catch (e: any) {
      console.error('uploadImages', e)

      return null
    }
  }

  const onChangeImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    setIsLoadingImages(true)
    if (files && files.length > 0) {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
      }
      const secure_urls = await uploadImages(formData)
      console.info('secure_urls', secure_urls)
      setImages(secure_urls)
      formik.setFieldValue('images', secure_urls)
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' onSubmit={handleSubmit} noValidate>
        <CardActions>
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isLoadingImages ? <CircularProgress /> : <ImgStyled src={images} alt='Profile Pic' />}
            </Box>
            <Box width={'100%'} mt={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Upload Photos
                <input
                  hidden
                  multiple
                  type='file'
                  onChange={onChangeImages}
                  accept='*'
                  id='account-settings-upload-image'
                />
              </ButtonStyled>
              <ResetButtonStyled color='error' variant='outlined' onClick={() => setImages('')}>
                Reset
              </ResetButtonStyled>
            </Box>
          </Box>
        </CardActions>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. USER
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction='row' spacing='10px' alignItems='center' mb='10px'>
                <Typography component='label' fontWeight='medium' fontSize={14}>
                  Email
                </Typography>
              </Stack>
              <TextField
                required
                disabled={true}
                placeholder='Email'
                fullWidth
                type={'email'}
                value={formik.values.email}
                onChange={e => {
                  formik.setFieldValue('email', e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputField label='Full name' placeholder='Full name' fullWidth {...getFieldPropsCustom('full_name')} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputField label='Phone' placeholder='Phone' fullWidth {...getFieldPropsCustom('phone')} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputField required select fullWidth label='Status' {...getFieldPropsCustom('status')}>
                {STATUS_USER_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </InputField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputField required select fullWidth label='Status' {...getFieldPropsCustom('role')}>
                {ROLE_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </InputField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputField required select fullWidth label='Gender' {...getFieldPropsCustom('gender')}>
                {GENDER_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </InputField>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant='outlined' size='large' fullWidth onClick={handleBack}>
            Back
          </Button>
          <Button fullWidth size='large' type='submit' sx={{ mr: 2 }} variant='contained' disabled={isLoadingImages}>
            CONFIRM
          </Button>
        </CardActions>
      </Form>
    </FormikProvider>
  )
}
