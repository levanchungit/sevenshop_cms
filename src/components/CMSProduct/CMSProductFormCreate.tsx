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
  Autocomplete,
  ButtonProps
} from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { Fragment, useState, useContext, ElementType, ChangeEvent } from 'react'
import { EditCmsProductPayload } from 'interfaces/Product'
import { useFormikCustom } from 'hook/lib'
import { APP_ROUTES } from 'global/constants/index'
import { InputField } from 'components/CustomFields'
import useCMSGetCategories from 'hook/category/useCMSGetCategories'
import useCMSGetColors from 'hook/color/useCMSGetColors'
import useCMSGetSizes from 'hook/size/useCMSGetSizes'
import { productsAPI } from 'modules'
import { SettingsContext } from '@core/context/settingsContext'
import { styled } from '@mui/material/styles'
import uploadAPI from 'modules/uploadAPI'

interface Props {
  initialValues?: Partial<EditCmsProductPayload>
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
  const [images, setImages] = useState([])
  const [isLoadingImages, setIsLoadingImages] = useState(false)

  let arrCategories: (string | undefined)[] = []
  let arrSizes: (string | undefined)[] = []
  let arrColors: (string | undefined)[] = []

  const formik = useFormikCustom({
    initialValues: {
      name: '',
      price: 0,
      description: '',
      images: [],
      category_ids: [],
      color_ids: [],
      size_ids: [],
      ...initialValues
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required().min(1),
      description: yup.string().required(),
      images: yup.array().required().min(1, 'Min 1 element'),
      category_ids: yup.array().required().min(1, 'Min 1 element'),
      color_ids: yup.array().required().min(1, 'Min 1 element'),
      size_ids: yup.array().required().min(1, 'Min 1 element')
    }),
    onSubmit: async (data, actions) => {
      console.log('onSubmit', data)
      try {
        const response = await productsAPI.createProduct(data)

        //generate stock
        const responseStock = await productsAPI.generateStock(response.data.id)
        if (response.status === 200 && responseStock.status === 200) {
          setSnackbarAlert({ message: 'Add product & generate stock successfully', severity: 'success' })
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
      console.log('secure_urls', secure_urls)
      setImages(secure_urls)
      formik.setFieldValue('images', secure_urls)
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' onSubmit={handleSubmit} noValidate>
        <CardActions sx={{ maxWidth: 600 }}>
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
                multiple
                onChange={(event, values) => {
                  if (values == null) {
                    arrCategories = []
                  } else {
                    const stringArray = values.map(item => item._id)
                    for (let i = 0; i < stringArray.length; i++) {
                      arrCategories.push(stringArray[i].toString())
                    }
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
                multiple
                onChange={(event, values) => {
                  if (values == null) {
                    arrColors = []
                  } else {
                    const stringArray = values.map(item => item._id)
                    for (let i = 0; i < stringArray.length; i++) {
                      arrColors.push(stringArray[i].toString())
                    }
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
                renderOption={(props, option) => (
                  <li {...props}>
                    <Box
                      component='span'
                      sx={{
                        width: 30,
                        height: 30,
                        border: '0.1px solid #C4C4C4',
                        bgcolor: option.code,
                        mr: 1,
                        borderRadius: 10
                      }}
                      style={{ backgroundColor: option.code }}
                    />
                    <Box
                      sx={{
                        flexGrow: 1,
                        '& span': {
                          color: 'red'
                        }
                      }}
                    >
                      {option.name}
                      <br />
                    </Box>
                  </li>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                id='size_ids'
                open={openSizes}
                multiple
                onChange={(event, values) => {
                  if (values == null) {
                    arrSizes = []
                  } else {
                    const stringArray = values.map(item => item._id)
                    for (let i = 0; i < stringArray.length; i++) {
                      arrSizes.push(stringArray[i].toString())
                    }
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
