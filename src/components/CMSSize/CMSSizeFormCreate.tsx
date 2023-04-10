import { Button, Typography, Grid, CardContent, CardActions } from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { useContext } from 'react'
import { useFormikCustom } from 'hook/lib'
import { InputField } from 'components/CustomFields'
import { sizesAPI } from 'modules'
import { SettingsContext } from '@core/context/settingsContext'

export default function CMSSizeFormCreate() {
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)
  const formik = useFormikCustom({
    initialValues: {
      name: '',
      size: ''
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      size: yup.string().required()
    }),
    onSubmit: async (data, actions) => {
      console.log('onSubmit', data)
      try {
        const response = await sizesAPI.createSize(data)
        if (response.status === 201) {
          setSnackbarAlert({ message: 'Add size successfully', severity: 'success' })
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' onSubmit={handleSubmit} noValidate>
        <CardContent>
          <Grid container spacing={5} justifyContent='center'>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. SIZE
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField label='Name' required placeholder='Name' fullWidth {...getFieldPropsCustom('name')} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField label='Size' required placeholder='Size' fullWidth {...getFieldPropsCustom('size')} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant='outlined' size='large' fullWidth onClick={handleBack}>
            Back
          </Button>
          <Button fullWidth size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            CONFIRM
          </Button>
        </CardActions>
      </Form>
    </FormikProvider>
  )
}
