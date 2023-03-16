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
  Autocomplete
} from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { Fragment, useState, useContext } from 'react'
import { EditCmsProductPayload } from 'interfaces/Product'
import { useFormikCustom } from 'hook/lib'
import { APP_ROUTES } from 'global/constants/index'
import { InputField } from 'components/CustomFields'
import useCMSGetCategories from 'hook/category/useCMSGetCategories'
import useCMSGetColors from 'hook/color/useCMSGetColors'
import useCMSGetSizes from 'hook/size/useCMSGetSizes'
import { productsAPI } from 'modules'
import { SettingsContext } from '@core/context/settingsContext'

interface Props {
  initialValues?: Partial<EditCmsProductPayload>
}

export default function CMSProductFormCreate(props: Props) {
  const { initialValues } = props
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)
  const { cms_categories, error: err_categories, isLoading: loading_categories } = useCMSGetCategories()
  const { cms_colors, error: err_colors } = useCMSGetColors()
  const { cms_sizes, error: err_sizes } = useCMSGetSizes()

  const [openCategories, setOpenCategories] = useState(false)
  const [openColors, setOpenColors] = useState(false)
  const [openSizes, setOpenSizes] = useState(false)

  let arrCategories: (string | undefined)[] = []
  let arrSizes: (string | undefined)[] = []
  let arrColors: (string | undefined)[] = []

  const formik = useFormikCustom({
    initialValues: {
      name: '',
      price: 0,
      description: '',
      category_ids: [],
      color_ids: [],
      size_ids: [],
      ...initialValues
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required().min(1),
      description: yup.string().required(),
      category_ids: yup.array().required().min(1, 'Min 1 element'),
      color_ids: yup.array().required().min(1, 'Min 1 element'),
      size_ids: yup.array().required().min(1, 'Min 1 element')
    }),
    onSubmit: async (data, actions) => {
      console.log('CREATE', data)
      try {
        const response = await productsAPI.createProduct(data)
        if (response.status === 200) {
          setSnackbarAlert({ message: 'Add product successfully', severity: 'success' })
        }
        await router.push({ pathname: APP_ROUTES.cmsProducts })
      } catch (e: any) {
        setSnackbarAlert({ message: e?.response.data.message, severity: 'error' })
      } finally {
        actions.setSubmitting(false)
      }
    }
  })
  const { handleSubmit, getFieldPropsCustom } = formik

  if (err_categories) return <Box>Failed to load err_categories</Box>
  if (err_colors) return <Box>Failed to load err_colors</Box>
  if (err_sizes) return <Box>Failed to load err_sizes</Box>
  if (!cms_categories)
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography mx={5}>Loading cms_categories...</Typography>
      </div>
    )
  if (!cms_colors)
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography mx={5}>Loading cms_colors...</Typography>
      </div>
    )
  if (!cms_sizes)
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography mx={5}>Loading cms_sizes...</Typography>
      </div>
    )

  const handleBack = () => {
    router.push(APP_ROUTES.cmsProducts)
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' onSubmit={handleSubmit} noValidate>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. PRODUCT
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField label='Name' required placeholder='Name' fullWidth {...getFieldPropsCustom('name')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                label='Price'
                inputMode='numeric'
                required
                placeholder='Price'
                fullWidth
                type={'number'}
                {...getFieldPropsCustom('price')}
              />
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

            <Grid item xs={12} sm={6}>
              <Autocomplete
                id='category_ids'
                open={openCategories}
                onChange={(event, values) => {
                  if (values == null) {
                    arrCategories = []
                  } else {
                    arrCategories.push(values?._id)
                  }
                  formik.setFieldValue('category_ids', arrCategories)
                }}
                onOpen={() => {
                  setOpenCategories(true)
                }}
                onClose={() => {
                  setOpenCategories(false)
                }}
                options={cms_categories}
                isOptionEqualToValue={(option, value) => {
                  return option.name === value.name
                }}
                getOptionLabel={option => option.name}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Categories'
                    name='category_ids'
                    id='category_ids'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {loading_categories ? <CircularProgress color='primary' size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                id='color_ids'
                open={openColors}
                onChange={(event, values) => {
                  if (values == null) {
                    arrColors = []
                  } else {
                    arrColors.push(values?._id)
                  }
                  formik.setFieldValue('color_ids', arrColors)
                }}
                onOpen={() => {
                  setOpenColors(true)
                }}
                onClose={() => {
                  setOpenColors(false)
                }}
                options={cms_colors}
                isOptionEqualToValue={(option, value) => {
                  return option.name === value.name
                }}
                getOptionLabel={option => option.name}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Colors'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {loading_categories ? <CircularProgress color='primary' size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                id='size_ids'
                open={openSizes}
                onChange={(event, values) => {
                  if (values == null) {
                    arrSizes = []
                  } else {
                    arrSizes.push(values?._id)
                  }
                  formik.setFieldValue('size_ids', arrSizes)
                }}
                onOpen={() => {
                  setOpenSizes(true)
                }}
                onClose={() => {
                  setOpenSizes(false)
                }}
                options={cms_sizes}
                isOptionEqualToValue={(option, value) => {
                  return option.name === value.name
                }}
                getOptionLabel={option => option.name}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Sizes'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {loading_categories ? <CircularProgress color='primary' size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2. REVIEW
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
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
