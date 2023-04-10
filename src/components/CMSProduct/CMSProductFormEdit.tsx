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
  ButtonProps,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem
} from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { Fragment, useState, useContext, ElementType, ChangeEvent } from 'react'
import { CmsProduct } from 'interfaces/Product'
import { useFormikCustom } from 'hook/lib'
import { STATUS_PRODUCT_OPTIONS } from 'global/constants/index'
import { InputField } from 'components/CustomFields'
import useCMSGetCategories from 'hook/category/useCMSGetCategories'
import useCMSGetColors from 'hook/color/useCMSGetColors'
import useCMSGetSizes from 'hook/size/useCMSGetSizes'
import { productsAPI } from 'modules'
import { SettingsContext } from '@core/context/settingsContext'
import { styled } from '@mui/material/styles'
import uploadAPI from 'modules/uploadAPI'
import { DeleteOutlineOutlined } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'

interface Props {
  initialValues: CmsProduct
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

export default function CMSProductFormEdit(props: Props) {
  const { initialValues, mutate } = props
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)

  const { cms_categories, error: err_categories, isLoading: loading_categories } = useCMSGetCategories()
  const { cms_colors, error: err_colors } = useCMSGetColors()
  const { cms_sizes, error: err_sizes } = useCMSGetSizes()

  const [openCategories, setOpenCategories] = useState(false)
  const [openColors, setOpenColors] = useState(false)
  const [openSizes, setOpenSizes] = useState(false)
  const [images, setImages] = useState(initialValues.images)
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const [dialogConfirm, setDialogConfirm] = useState({ open: false, id: '' })

  const handleOpenDialogConfirm = (id: string) => {
    setDialogConfirm({ open: true, id: id })
  }
  const handleCloseDialogConfirm = () => {
    setDialogConfirm({ open: false, id: '' })
  }
  const handleDeleteStock = async (id: string) => {
    //update product with new stock
    initialValues.stock = initialValues.stock.filter(item => item._id !== id)
    initialValues.color_ids = initialValues.color_ids.map((item: any) => item._id)
    initialValues.size_ids = initialValues.size_ids.map((item: any) => item._id)
    initialValues.stock = initialValues.stock.map((item: any) => {
      return {
        _id: item._id,
        size_id: item.size_id._id,
        color_id: item.color_id._id,
        quantity: item.quantity
      }
    })

    console.log('initialValues', initialValues)

    const response = await productsAPI.updateProduct(initialValues)
    if (response.status === 200) {
      setSnackbarAlert({ message: 'Delete Stock Successfully', severity: 'success' })
    }

    handleCloseDialogConfirm()
    mutate()
  }

  let arrCategories: (string | undefined)[] = []
  let arrSizes: (string | undefined)[] = []
  let arrColors: (string | undefined)[] = []

  const formik = useFormikCustom({
    initialValues: {
      _id: initialValues._id,
      name: initialValues.name,
      price: initialValues.price,
      price_sale: initialValues.price_sale,
      images: initialValues.images,
      stock: initialValues.stock.map((item: any) => {
        return {
          _id: item._id,
          size_id: item.size_id._id,
          color_id: item.color_id._id,
          quantity: item.quantity
        }
      }),

      status: initialValues.status,
      description: initialValues.description,
      category_ids: initialValues.category_ids,
      color_ids: initialValues.color_ids.map((item: any) => item._id),
      size_ids: initialValues.size_ids.map((item: any) => item._id)
    },
    validationSchema: yup.object().shape({
      // _id: yup.string().required(),
      name: yup.string().required(),
      price: yup.number().required().min(0),
      price_sale: yup.number().required().min(0),
      description: yup.string().required(),
      status: yup.string().required(),
      images: yup.array().required().min(1, 'Min 1 element'),
      category_ids: yup.array().required().min(1, 'Min 1 element'),
      color_ids: yup.array().required().min(1, 'Min 1 element'),
      size_ids: yup.array().required().min(1, 'Min 1 element')
    }),
    onSubmit: async (data, actions) => {
      console.log('onSubmit UPDATE', data)
      try {
        const response = await productsAPI.updateProduct(data)
        if (response.status === 200) {
          setSnackbarAlert({ message: 'Update product successfully', severity: 'success' })
        }
        mutate()
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

  const defaultCategories = cms_categories.filter(c => initialValues?.category_ids.includes(c._id))
  const defaultColors = cms_colors.filter(c => initialValues?.color_ids.map((item: any) => item._id).includes(c?._id))
  const defaultSizes = cms_sizes.filter(c => initialValues?.size_ids.map((item: any) => item._id).includes(c?._id))
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

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    const quantity = event.target.value
    const stock = formik.values.stock
    const index = stock.findIndex((item: any) => item._id === id)
    if (index >= 0) {
      stock[index].quantity = quantity
      formik.setFieldValue('stock', stock)
    }
  }

  //call api generate Stock
  const handleGenerateStock = async () => {
    try {
      const response = await productsAPI.generateStock(initialValues._id)
      if (response.status === 200) {
        setSnackbarAlert({ message: 'Generate Stock Successfully', severity: 'success' })
        const data = response.data.stock.forEach((item: any) => {
          return {
            _id: item._id,
            size_id: item.size_id._id,
            color_id: item.color_id._id,
            quantity: item.quantity
          }
        })

        initialValues.stock = data
        console.log('initialValues.stock', response.data.stock)
        mutate()
      }
    } catch (e: any) {
      setSnackbarAlert({ message: e?.response.data.message, severity: 'error' })
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
            <Grid item xs={12} sm={4}>
              <InputField label='Name' required placeholder='Name' fullWidth {...getFieldPropsCustom('name')} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField
                label='Price'
                inputMode='numeric'
                required
                placeholder='Price'
                fullWidth
                type={'number'}
                InputProps={{ inputProps: { min: 0 } }}
                {...getFieldPropsCustom('price')}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField
                label='Price Sale'
                inputMode='numeric'
                required
                placeholder='Price Sale'
                fullWidth
                type={'number'}
                InputProps={{ inputProps: { min: 0 } }}
                {...getFieldPropsCustom('price_sale')}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputField
                label='Description'
                required
                placeholder='Description'
                fullWidth
                {...getFieldPropsCustom('description')}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputField required select fullWidth label='Status' {...getFieldPropsCustom('status')}>
                {STATUS_PRODUCT_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </InputField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Autocomplete
                id='category_ids'
                multiple
                open={openCategories}
                defaultValue={defaultCategories}
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
                onChange={(event, values) => {
                  if (values.length == 0) {
                    arrCategories = []
                  } else {
                    const stringArray = values.map(item => item._id)
                    for (let i = 0; i < stringArray.length; i++) {
                      arrCategories.push(stringArray[i].toString())
                    }
                  }
                  formik.setFieldValue('category_ids', arrCategories)
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

            <Grid item xs={12} sm={4}>
              <Autocomplete
                id='color_ids'
                open={openColors}
                multiple
                defaultValue={defaultColors}
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

            <Grid item xs={12} sm={4}>
              <Autocomplete
                id='size_ids'
                open={openSizes}
                multiple
                defaultValue={defaultSizes}
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
            <Grid item xs={12} display='flex' flexDirection='row'>
              <Typography flex='1' variant='body2' sx={{ fontWeight: 600 }}>
                2. STOCK
              </Typography>
              <Button variant='contained' onClick={handleGenerateStock}>
                Generate Stock
              </Button>
            </Grid>

            <TableContainer sx={{ maxHeight: 500 }} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2} align='left'>
                      Color
                    </TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align='right'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {initialValues.stock &&
                    initialValues.stock.map(row => (
                      <TableRow
                        key={row._id}
                        sx={{
                          '&:last-of-type td, &:last-of-type th': {
                            border: 0
                          }
                        }}
                      >
                        <TableCell>{row.color_id.name}</TableCell>
                        <TableCell>
                          <Box
                            key={row.color_id._id}
                            mr={1}
                            sx={{
                              width: 30,
                              height: 30,
                              border: '0.1px solid #C4C4C4',
                              bgcolor: row.color_id.code,
                              borderRadius: 10
                            }}
                          ></Box>
                        </TableCell>
                        <TableCell>{row.size_id.size}</TableCell>
                        <TableCell>
                          {/* set stock quantity */}
                          <InputField
                            inputMode='numeric'
                            required
                            placeholder='Quantity'
                            fullWidth
                            type={'number'}
                            InputProps={{ inputProps: { min: 0 } }}
                            defaultValue={row.quantity}
                            onChange={e => handleChangeQuantity(e, row._id)}
                          />
                        </TableCell>
                        <TableCell align='right'>
                          <IconButton onClick={() => handleOpenDialogConfirm(row._id)}>
                            <DeleteOutlineOutlined />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                3. REVIEW
              </Typography>
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

      <Dialog
        open={dialogConfirm.open}
        onClose={handleCloseDialogConfirm}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'INFO'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>Do you want remove ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogConfirm}>Cancel</Button>
          <Button onClick={() => handleDeleteStock(dialogConfirm.id)} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </FormikProvider>
  )
}
