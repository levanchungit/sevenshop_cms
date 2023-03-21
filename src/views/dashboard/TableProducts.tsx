// ** MUI Imports
import {
  Box,
  Card,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  Button,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { EditOutlined, DeleteOutlineOutlined } from '@mui/icons-material'
import { useState, Fragment, useCallback, useContext } from 'react'
import * as React from 'react'
import { productsAPI } from 'modules'
import {
  GridRenderCellParams,
  GridRowParams,
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter
} from '@mui/x-data-grid'
import { currencyFormatterVND, formatDate } from 'utils/currencyFormatter'
import { SettingsContext } from '@core/context/settingsContext'
import { useRouter } from 'next/router'
import { APP_ROUTES } from 'global/constants/index'
import useCMSGetProducts from 'hook/product/useCMSGetProducts'
import { CmsProduct } from 'interfaces/Product'
import { CmsCategory } from 'interfaces/Category'
import useCMSGetCategories from 'hook/category/useCMSGetCategories'
import useCMSGetColors from 'hook/color/useCMSGetColors'
import useCMSGetSizes from 'hook/size/useCMSGetSizes'
import { CmsColor } from 'interfaces/Color'
import { CmsSize } from 'interfaces/Size'

const CustomToolbar = () => {
  return (
    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', m: 2 }}>
      <Box
        sx={{
          p: 0.5,
          pb: 0
        }}
      >
        <GridToolbarQuickFilter
          quickFilterParser={(searchInput: string) =>
            searchInput
              .split(',')
              .map(value => value.trim())
              .filter(value => value !== '')
          }
        />
      </Box>
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

const TableProducts = () => {
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)

  //SWR
  const { cms_products, cms_err_products, cms_mutate_product } = useCMSGetProducts()
  const { cms_categories, error: cms_err_categories } = useCMSGetCategories()
  const { cms_colors, error: cms_err_colors } = useCMSGetColors()
  const { cms_sizes, error: cms_err_sizes } = useCMSGetSizes()

  //STATE
  const [dialogConfirm, setDialogConfirm] = useState(false)
  const [idProduct, setIdProduct] = useState<GridRowId>('')

  //HANDLER
  const handleOpenDialogConfirm = () => {
    setDialogConfirm(true)
  }
  const handleCloseDialogConfirm = () => {
    setDialogConfirm(false)
  }
  const handleDeleteProduct = async () => {
    await productsAPI.deleteProduct(idProduct as string)
    cms_mutate_product()
    setSnackbarAlert({ message: 'Delete Product Successfully', severity: 'success' })
    handleCloseDialogConfirm()
  }

  const handleCreate = () => router.push(APP_ROUTES.cmsProductCreate)
  const handleEdit = useCallback(
    (_id: GridRowId) => () => {
      router.push({ pathname: APP_ROUTES.cmsProductEdit, query: { id: _id } })
    },
    []
  )

  if (cms_err_products || cms_err_categories || cms_err_colors || cms_err_sizes) return <Box>Failed to load</Box>
  if (!cms_products || !cms_categories || !cms_colors || !cms_sizes)
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography mx={5}>Loading...</Typography>
      </div>
    )

  //ROW - COLUMN
  const ExpandableCell = ({ value }: GridRenderCellParams) => {
    const [expanded, setExpanded] = React.useState(false)

    return (
      <Box>
        {expanded ? value : value.toString().slice(0, 50)}&nbsp;
        {value.length > 50 && (
          <Link type='button' component='button' sx={{ fontSize: 'inherit' }} onClick={() => setExpanded(!expanded)}>
            {expanded ? 'view less' : 'view more'}
          </Link>
        )}
      </Box>
    )
  }
  const _rows = cms_products.map((row: CmsProduct) => {
    return {
      id: row._id,
      name: row.name,
      price: row.price,
      price_sale: row.price_sale,
      description: row.description,
      images: row.images,
      stock: row.stock,
      status: row.status,
      category_ids: row.category_ids,
      color_ids: row.color_ids,
      size_ids: row.size_ids,
      created_at: row.created_at,
      created_by: row.created_by,
      modify: row.modify
    }
  })

  const _columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 250},
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Avatar alt='Avatar' src={params.row.images[0]} sx={{ mr: 2, width: 50, height: 50 }} />
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
      width: 200,
      renderCell: (params: GridRenderCellParams) => <ExpandableCell {...params} />
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          sx={{
            ':hover': {
              bgColor: 'gray'
            },
            px: 2,
            bgcolor: params.value == 'active' ? '#E0F2FE' : '#FEE2E2',
            color: params.value == 'active' ? '#0EA5E9' : '#DC2626'
          }}
          variant='contained'
          size='small'
        >
          {params.value}
        </Button>
      )
    },
    {
      field: 'category_ids',
      headerName: 'Categories',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography sx={{ fontSize: '0.875rem' }}>
          {cms_categories
            .filter(c => params.value.includes(c._id))
            .map((category: CmsCategory) => category.name)
            .join(', ')}
        </Typography>
      )
    },
    {
      field: 'color_ids',
      headerName: 'Colors',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {cms_colors
            .filter(c => params.value.includes(c._id))
            .map((color: CmsColor) => {
              return (
                <Box
                  key={color._id}
                  mr={1}
                  sx={{
                    width: 30,
                    height: 30,
                    border: '0.1px solid #C4C4C4',
                    bgcolor: color.code,
                    borderRadius: 10
                  }}
                ></Box>
              )
            })}
        </Box>
      )
    },
    {
      field: 'size_ids',
      headerName: 'Sizes',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography sx={{ fontSize: '0.875rem' }}>
          {cms_sizes
            .filter(c => params.value.includes(c._id))
            .map((size: CmsSize) => size.name)
            .join(', ')}
        </Typography>
      )
    },
    {
      field: 'created_at',
      headerName: 'Created',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Box flex={1} flexWrap={'wrap'}>
            <Typography sx={{ fontSize: '0.875rem' }}>{formatDate(params.value)}</Typography>
            <Typography sx={{ fontSize: '0.875rem' }}>{params.row.created_by}</Typography>
          </Box>
        </>
      )
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          color='primary'
          key={params.id}
          icon={<EditOutlined />}
          onClick={handleEdit(params.id)}
          label='Edit'
        />,
        <GridActionsCellItem
          color='primary'
          key={params.id}
          icon={<DeleteOutlineOutlined />}
          onClick={() => {
            handleOpenDialogConfirm(), setIdProduct(params.id)
          }}
          label='Delete'
        />
      ]
    }
  ]

  return (
    <>
      <Grid my={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' component='label' onClick={handleCreate} aria-label='add'>
          Create Product
        </Button>
      </Grid>

      <Card style={{ width: '100%' }}>
        <DataGrid
          getRowId={row => row.id}
          rows={_rows}
          columns={_columns}
          slots={{ toolbar: CustomToolbar }}
          sx={{
            '& .MuiDataGrid-row:hover': {
              color: 'primary.main',
              border: '1px solid red'
            },
            minHeight: 682
          }}
          checkboxSelection
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } }
          }}
          pageSizeOptions={[10, 20, 30]}
        />
      </Card>

      <Dialog
        open={dialogConfirm}
        onClose={handleCloseDialogConfirm}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'INFO'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>Do you want remove ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogConfirm}>Disagree</Button>
          <Button onClick={handleDeleteProduct} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TableProducts
