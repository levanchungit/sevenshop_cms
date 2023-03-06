// ** MUI Imports
import {
  Box,
  Card,
  Chip,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Fab,
  Typography,
  TableContainer,
  Avatar,
  Modal,
  Fade,
  Grid,
  TextField,
  CardHeader,
  CardContent,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  CircularProgress,
  Button,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import { useState, useEffect, ChangeEvent, Fragment } from 'react'
import * as React from 'react'
import { CreateProductData, MetaDataDetail, PropertiesProductData } from 'interfaces/Auth'
import { authAPI } from 'modules'

// ** Types Imports

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 800,
  boxShadow: 24,
  p: 4
}

const TableProducts = (props: any) => {
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState<MetaDataDetail[]>([])
  const [colors, setColors] = useState<MetaDataDetail[]>([])
  const [sizes, setSizes] = useState<MetaDataDetail[]>([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const properties: PropertiesProductData = {
    color_id: '',
    size_id: '',
    quantity: 0
  }

  const [formData, setFormData] = useState<CreateProductData>({
    name: '',
    price: 0,
    price_sale: 0,
    description: '',
    active: true,
    categories_type: '',
    images: [],
    properties_type: []
  })
  const [openCategories, setOpenCategories] = useState(false)
  const loading = openCategories && categories.length === 0

  useEffect(() => {
    getColors()
    getSizes()
    if (!openCategories) {
      setCategories([])
    }
  }, [openCategories])

  useEffect(() => {
    getCategories()
  }, [loading])

  const getCategories = async () => {
    try {
      const response = await authAPI.getCategories()
      setCategories(response.data)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  const getColors = async () => {
    try {
      const response = await authAPI.getColors()
      setColors(response.data)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  const getSizes = async () => {
    try {
      const response = await authAPI.getSizes()
      setSizes(response.data)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  const onCreateProduct = async (event: any) => {
    event.preventDefault()
    try {
      setFormData({ ...formData, properties_type: [...formData.properties_type, properties] })
      const response = await authAPI.createProduct(formData)
      console.log(response)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  return (
    <>
      <Box sx={{ alignItems: 'flex-end', justifyItems: 'end' }}>
        <Fab onClick={handleOpen} color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Box>
      <Card>
        {!props.data ? (
          <CircularProgress color='primary' />
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Storage Quantity</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data.map((item: any, index: number) => (
                  <TableRow hover key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box>
                        <Avatar alt='Avatar' src={item.images[0]} sx={{ width: 100, height: 100 }} />
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h3' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                          {item.name}
                        </Typography>
                        <Typography variant='caption'>{item.categories_type}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                          variant='h3'
                          sx={{
                            width: 100,
                            textDecoration: item.price_sale > 0 ? 'line-through' : null,
                            color: item.price_sale > 0 ? '#C9C9C9' : 'red',
                            fontWeight: 500,
                            fontSize: '0.875rem !important'
                          }}
                        >
                          {item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </Typography>
                        <Typography sx={{ color: item.price_sale > 0 ? 'red' : 'black ' }}>
                          {item.price_sale > 0
                            ? item.price_sale.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                            : null}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.storage_quantity}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.active ? 'true' : 'false'}
                        color={item.active ? 'success' : 'error'}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Fab color='primary' aria-label='edit'>
                          <EditIcon />
                        </Fab>
                        <Fab sx={{ marginX: 2 }} color='primary' aria-label='delete'>
                          <DeleteIcon />
                        </Fab>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box sx={style}>
              <Card>
                <CardHeader title='Create New Product' titleTypographyProps={{ variant: 'h6' }} />
                <CardContent>
                  <form method='POST' action='' onSubmit={onCreateProduct}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} container direction='row' justifyContent='center' alignItems='center'>
                        <Button variant='contained' component='label'>
                          Upload Images
                          <input hidden accept='image/*' multiple type='file' />
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          value={formData.name}
                          onChange={(e: ChangeEvent<any>): void => {
                            setFormData({ ...formData, name: e.target.value })
                          }}
                          name='name'
                          fullWidth
                          label='Name'
                          placeholder='Product 1'
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <TextField
                          value={formData.price}
                          onChange={(e: ChangeEvent<any>): void => {
                            setFormData({ ...formData, price: e.target.value })
                          }}
                          fullWidth
                          type='number'
                          label='Price'
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <TextField
                          value={formData.price_sale}
                          onChange={(e: ChangeEvent<any>): void => {
                            setFormData({ ...formData, price_sale: e.target.value })
                          }}
                          fullWidth
                          type='number'
                          label='Price Sale'
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          value={formData.description}
                          onChange={(e: ChangeEvent<any>): void => {
                            setFormData({ ...formData, description: e.target.value })
                          }}
                          multiline
                          rows={3}
                          fullWidth
                          label='Description'
                          placeholder='...'
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Autocomplete
                          id='asynchronous-demo'
                          open={openCategories}
                          onOpen={() => {
                            setOpenCategories(true)
                          }}
                          onClose={() => {
                            setOpenCategories(false)
                          }}
                          options={categories}
                          isOptionEqualToValue={(option, value) => {
                            return option.code_name === value.code_name
                          }}
                          getOptionLabel={option => option.code_name}
                          onChange={(event, value) => {
                            setFormData({ ...formData, categories_type: value?._id || '' })
                          }}
                          loading={loading}
                          renderInput={params => (
                            <TextField
                              {...params}
                              label='Categories'
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <Fragment>
                                    {loading ? <CircularProgress color='primary' size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                  </Fragment>
                                )
                              }}
                            />
                          )}
                        />
                        <FormControlLabel
                          value='start'
                          control={
                            <Checkbox
                              aria-label='12312'
                              checked={formData.active}
                              onChange={(e: React.ChangeEvent<any>): void => {
                                setFormData({ ...formData, active: e.target.checked })
                              }}
                              color='primary'
                            />
                          }
                          label='Active'
                          labelPlacement='start'
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <ToggleButtonGroup
                          orientation='horizontal'
                          value={colors}
                          exclusive
                          sx={{ flexDirection: 'row', flexWrap: 'wrap' }}
                          onChange={(event: React.MouseEvent<HTMLElement>, value: any) => {
                            properties.color_id = value
                          }}
                        >
                          {colors.map((item, index) => (
                            <ToggleButton
                              key={index}
                              value={item._id}
                              sx={{
                                ':hover': {
                                  borderColor: 'black',
                                  borderWidth: 2,
                                  backgroundColor: item.num1
                                },
                                backgroundColor: item.num1
                              }}
                            >
                              <CheckIcon
                                sx={{
                                  ':hover': {
                                    color: item.num1 == '#FFFFFF' ? 'black' : 'white'
                                  },
                                  color: 'transparent',
                                  backgroundColor: 'transparent'
                                }}
                              />
                            </ToggleButton>
                          ))}
                        </ToggleButtonGroup>
                      </Grid>

                      <Grid item xs={4}>
                        <ToggleButtonGroup
                          orientation='horizontal'
                          value={sizes}
                          exclusive
                          onChange={(event: React.MouseEvent<HTMLElement>, value: any) => {
                            properties.size_id = value
                          }}
                          sx={{ flexWrap: 'wrap' }}
                        >
                          {sizes.map((item, index) => (
                            <ToggleButton
                              sx={{
                                ':hover': {
                                  borderColor: 'black',
                                  borderWidth: 2,
                                  backgroundColor: 'main'
                                }
                              }}
                              size={'small'}
                              key={index}
                              value={item._id}
                            >
                              {item.eng}
                            </ToggleButton>
                          ))}
                        </ToggleButtonGroup>
                      </Grid>

                      <Grid item xs={4}>
                        <TextField
                          value={formData.price_sale}
                          onChange={(e: ChangeEvent<any>): void => {
                            setFormData({ ...formData, price_sale: e.target.value })
                          }}
                          fullWidth
                          type='number'
                          label='Quantity'
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            gap: 5,
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Button
                            sx={{ width: '100%' }}
                            type='submit'
                            onSubmit={onCreateProduct}
                            variant='contained'
                            size='large'
                          >
                            CREATE
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Box>
          </Fade>
        </Modal>
      </Card>
    </>
  )
}
export default TableProducts
