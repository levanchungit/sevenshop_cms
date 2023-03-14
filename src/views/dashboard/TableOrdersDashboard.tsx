// ** MUI Imports
import {
  Box,
  Card,
  Typography,
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
  ToggleButton,
  Link
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useState, useEffect, ChangeEvent, Fragment, useContext } from 'react'
import * as React from 'react'
import { authAPI } from 'modules'

import {
  GridRenderCellParams,
  GridRowParams,
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridColDef,
  GridToolbar
} from '@mui/x-data-grid'
import { currencyFormatterVND } from 'utils/currencyFormatter'
import { SettingsContext } from '@core/context/settingsContext'

// ** Types Imports

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  boxShadow: 24,
  p: 4
}

const TableOrders = (props: any) => {
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState<MetaDataDetail[]>([])
  const [colors, setColors] = useState<MetaDataDetail[]>([])
  const [sizes, setSizes] = useState<MetaDataDetail[]>([])
  const { setSnackbarAlert } = useContext(SettingsContext)

  // const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const ExpandableCell = ({ value }: GridRenderCellParams) => {
    const [expanded, setExpanded] = React.useState(false)

    return (
      <Box>
        {expanded ? value : value.toString().slice(0, 50)}&nbsp;
        {value.length > 50 && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link type='button' component='button' sx={{ fontSize: 'inherit' }} onClick={() => setExpanded(!expanded)}>
            {expanded ? 'view less' : 'view more'}
          </Link>
        )}
      </Box>
    )
  }

  const _rows = props.data.map((row: ProductData) => {
    return {
      id: row._id,
      name: row.name,
      price: row.price,
      price_sale: row.price_sale,
      description: row.description,
      images: row.images,
      active: row.active,
      storage_quantity: row.storage_quantity,
      properties_type: row.properties_type,
      categories_type: row.categories_type,
      create_at: row.create_at,
      create_by: row.create_by,
      modify_at: row.modify_at,
      modify_by: row.modify_by
    }
  })

  const _columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250 },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Avatar alt='Avatar' src={params.row.images[0]} sx={{ width: 50, height: 50 }} />
          {params.value}
        </>
      )
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      valueFormatter: ({ value }) => currencyFormatterVND(value),
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant='h4'
              sx={{
                textDecoration: params.row.price_sale > 0 ? 'line-through' : null,
                color: params.row.price_sale > 0 ? '#C9C9C9' : 'red',
                fontWeight: 500,
                fontSize: '0.875rem !important'
              }}
            >
              {currencyFormatterVND(params.value)}
            </Typography>
            <Typography sx={{ color: params.row.price_sale > 0 ? 'red' : 'black ' }}>
              {params.row.price_sale > 0 ? currencyFormatterVND(params.row.price_sale) : null}
            </Typography>
          </Box>
        </>
      )
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
      renderCell: (params: GridRenderCellParams) => <ExpandableCell {...params} />
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          sx={{
            ':hover': {
              bgColor: 'gray'
            },
            bgcolor: params.value ? '#E0F2FE' : '#FEE2E2',
            color: params.value ? '#0EA5E9' : '#DC2626'
          }}
          variant='contained'
          size='small'
        >
          {params.value ? 'TRUE' : 'FALSE'}
        </Button>
      )
    },
    { field: 'storage_quantity', headerName: 'Storage', width: 100 },
    {
      field: 'properties_type',
      headerName: 'Properties',
      width: 200
    },
    { field: 'categories_type', headerName: 'Categories', width: 200 },
    { field: 'create_at', headerName: 'Create at', width: 200 },
    { field: 'create_by', headerName: 'Create by', width: 200 },
    { field: 'modify_at', headerName: 'Modify at', width: 200 },
    { field: 'modify_by', headerName: 'Modify by', width: 200 },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          color='primary'
          key={params.id}
          icon={<EditOutlinedIcon />}
          onClick={editProduct(params.id)}
          label='Edit'
        />,
        <GridActionsCellItem
          color='primary'
          key={params.id}
          icon={<DeleteOutlineOutlinedIcon />}
          onClick={deleteProduct(params.id)}
          label='Delete'
        />
      ]
    }
  ]

  const properties_num = 1

  const properties: PropertiesProductData = {
    color_id: '',
    size_id: '',
    quantity: 0,
    id: ''
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
      setSnackbarAlert({ message: e.response.data.message, severity: 'error' })
    }
  }

  const getColors = async () => {
    try {
      const response = await authAPI.getColors()
      setColors(response.data)
    } catch (e: any) {
      setSnackbarAlert({ message: e.response.data.message, severity: 'error' })
    }
  }

  const getSizes = async () => {
    try {
      const response = await authAPI.getSizes()
      setSizes(response.data)
    } catch (e: any) {
      setSnackbarAlert({ message: e.response.data.message, severity: 'error' })
    }
  }

  const onCreateProduct = async (event: any) => {
    event.preventDefault()
    try {
      setFormData({ ...formData, properties_type: [...formData.properties_type, properties] })

      // const response = await authAPI.createProduct(formData)
      // setSnackbarAlert({ message: response.data.message, severity: 'success' })
    } catch (e: any) {
      setSnackbarAlert({ message: e.response.data.message, severity: 'error' })
    }
  }

  const editProduct = React.useCallback(
    (_id: GridRowId) => () => {
      setTimeout(() => {
        console.log('EDIT PRODUCT', _id)
      })
    },
    []
  )

  const deleteProduct = React.useCallback(
    (_id: GridRowId) => () => {
      setTimeout(() => {
        console.log('DELETE PRODUCT', _id)
      })
    },
    []
  )

  return (
    <>
      {/* <Card style={{ width: '100%' }}>
        <DataGrid
          key={_rows._id}
          rows={_rows}
          columns={_columns}
          slots={{ toolbar: GridToolbar }}
          sx={{
            '& .MuiDataGrid-row:hover': {
              color: 'primary.main',
              border: '1px solid red'
            },
            minHeight: 400
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              }
            }
          }}
          pageSizeOptions={[10]}
        />
      </Card> */}

      {/* <Modal
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
                <form onSubmit={onCreateProduct}>
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

                    <Grid item container xs={12}>
                      <Grid item my={5} xs={12}>
                        Properties {properties_num}
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
                    </Grid>

                    <Grid
                      item
                      container
                      xs={12}
                      sx={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                    >
                      <Button sx={{ width: '50%' }} variant='outlined' size='large'>
                        Add 1 properties
                      </Button>
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
                        <Button sx={{ width: '100%' }} type='submit' variant='contained' size='large'>
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
      </Modal> */}
    </>
  )
}
export default TableOrders
