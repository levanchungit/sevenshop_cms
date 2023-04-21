import { Button, Typography, Grid, CardContent, CardActions, CircularProgress, ButtonProps, Box } from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { ChangeEvent, ElementType, useContext, useState } from 'react'
import { useFormikCustom } from 'hook/lib'
import { InputField } from 'components/CustomFields'
import { notificationsAPI } from 'modules'
import { SettingsContext } from '@core/context/settingsContext'
import { styled } from '@mui/material/styles'
import uploadAPI from 'modules/uploadAPI'

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

export default function CMSNotificationFormCreate() {
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const [images, setImages] = useState([])

  const formik = useFormikCustom({
    initialValues: {
      title: '',
      body: '',
      image: '',
      to_user_id: [],
      tokens: []
    },
    validationSchema: yup.object().shape({
      title: yup.string().required('Title is required'),
      body: yup.string().required('Body is required'),
      image: yup.string().required('Image is required'),
      to_user_id: yup.array().required('To user id is required'),
      tokens: yup.array().required('Tokens is required')
    }),
    onSubmit: async (data, actions) => {
      console.log('onSubmit', data)
      try {
        const response = await notificationsAPI.pushNotification(data)
        if (response.status === 201) {
          setSnackbarAlert({ message: 'Push notification successfully', severity: 'success' })
        }
        await router.back()
      } catch (e: any) {
        setSnackbarAlert({ message: e?.response.data.message, severity: 'error' })
      } finally {
        actions.setSubmitting(false)
      }
    }
  })

  const { handleSubmit, getFieldPropsCustom, errors } = formik
  console.log(errors)
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
      console.info('secure_urls', secure_urls[0])
      setImages(secure_urls[0])
      formik.setFieldValue('images', secure_urls[0])
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' onSubmit={handleSubmit} noValidate>
        <CardContent>
          <Grid container spacing={5} justifyContent='center'>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. NOTIFICATION
              </Typography>
            </Grid>

            <CardActions sx={{ maxWidth: 1000 }}>
              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {isLoadingImages ? (
                    <CircularProgress />
                  ) : (
                    images.map((img, index) => <ImgStyled key={index.toString()} src={img} alt='Profile Pic' />)
                  )}
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
                  <ResetButtonStyled color='error' variant='outlined' onClick={() => setImages([])}>
                    Reset
                  </ResetButtonStyled>
                </Box>
              </Box>
            </CardActions>

            <Grid item xs={12} sm={6}>
              <InputField
                rows={2}
                label='Title'
                required
                placeholder='Title'
                fullWidth
                {...getFieldPropsCustom('title')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField label='Body' required placeholder='Body' fullWidth {...getFieldPropsCustom('body')} />
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
