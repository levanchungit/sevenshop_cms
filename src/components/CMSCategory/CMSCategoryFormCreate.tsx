import { Button, Typography, Grid, CardContent, CardActions, CircularProgress, Box, ButtonProps } from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { useState, useContext, ElementType, ChangeEvent } from 'react'
import { useFormikCustom } from 'hook/lib'
import { APP_ROUTES } from 'global/constants/index'
import { InputField } from 'components/CustomFields'
import { categoriesAPI } from 'modules'
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

export default function CMSCategoryFormCreate() {
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)

  const [images, setImages] = useState([])
  const [isLoadingImages, setIsLoadingImages] = useState(false)

  const formik = useFormikCustom({
    initialValues: {
      name: '',
      description: '',
      image: ''
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
      image: yup.string().required()
    }),
    onSubmit: async (data, actions) => {
      console.log('onSubmit', data)
      try {
        const response = await categoriesAPI.createCategory(data)
        if (response.status === 200) {
          setSnackbarAlert({ message: 'Add category successfully', severity: 'success' })
        }
        await router.back()
      } catch (e: any) {
        setSnackbarAlert({ message: e?.response.data.message, severity: 'error' })
      } finally {
        actions.setSubmitting(false)
      }
    }
  })
  const { handleSubmit, getFieldPropsCustom } = formik

  const handleBack = () => {
    router.back()
  }

  const uploadImages = async (formData: any) => {
    try {
      const response = await uploadAPI.multiple(formData)

      setIsLoadingImages(false)

      return response.data.secure_urls
    } catch (e: any) {
      console.log('uploadImages', e)

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
      console.log('secure_urls', secure_urls[0])
      setImages(secure_urls)
      formik.setFieldValue('image', secure_urls[0])
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' onSubmit={handleSubmit} noValidate>
        <CardActions sx={{ maxWidth: 1000 }}>
          <Box sx={{ minWidth: 600 }}>
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
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. CATEGORY
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField label='Name' required placeholder='Name' fullWidth {...getFieldPropsCustom('name')} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField
                label='Description'
                required
                placeholder='Description'
                fullWidth
                {...getFieldPropsCustom('description')}
              />
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
