import { Button, Typography, Grid, CardContent, CardActions } from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { useContext } from 'react'
import { useFormikCustom } from 'hook/lib'
import { InputField } from 'components/CustomFields'
import { colorsAPI } from 'modules'
import { SettingsContext } from '@core/context/settingsContext'
import { CmsColor } from 'interfaces/Color'
import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/lib/css/styles.css'

interface Props {
  initialValues: CmsColor
  mutate: any
}

export default function CMSColorFormEdit(props: Props) {
  const { initialValues, mutate } = props
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)
  const [color, setColor] = useColor('hex', initialValues.code)

  const formik = useFormikCustom({
    initialValues: {
      _id: initialValues._id,
      name: initialValues.name,
      code: initialValues.code
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      code: yup.string().required()
    }),
    onSubmit: async (data, actions) => {
      console.log('onSubmit UPDATE', data)
      try {
        const response = await colorsAPI.updateColor(data)
        if (response.status === 200) {
          setSnackbarAlert({ message: 'Update color successfully', severity: 'success' })
        }
        await router.back()
        mutate()
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
                1. COLOR
              </Typography>
            </Grid>
            <ColorPicker
              width={500}
              height={228}
              color={color}
              onChange={setColor}
              onChangeComplete={color => {
                formik.setFieldValue('code', color.hex)
              }}
              hideHSV
              dark
            />

            <Grid item xs={12} sm={6}>
              <InputField label='Name' required placeholder='Name' fullWidth {...getFieldPropsCustom('name')} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField label='Code' required placeholder='Code' fullWidth {...getFieldPropsCustom('code')} />
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
