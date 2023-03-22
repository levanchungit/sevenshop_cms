// ** MUI Imports
import { Box, Card, Typography, Grid, CircularProgress, Button } from '@mui/material'
import { EditOutlined } from '@mui/icons-material'
import { useCallback } from 'react'
import * as React from 'react'
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
import { useRouter } from 'next/router'
import { APP_ROUTES } from 'global/constants/index'
import useCMSGetCategories from 'hook/category/useCMSGetCategories'
import useCMSGetColors from 'hook/color/useCMSGetColors'
import useCMSGetSizes from 'hook/size/useCMSGetSizes'
import useCMSGetOrders from 'hook/order/useCMSGetOrders'
import { CmsOrder } from 'interfaces/Order'
import useCMSGetUsers from 'hook/user/useCMSGetUsers'
import useCMSGetProducts from 'hook/product/useCMSGetProducts'

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

const TableOrders = () => {
  const router = useRouter()

  //SWR
  const { cms_orders, cms_err_orders } = useCMSGetOrders()
  const { cms_products, cms_err_products } = useCMSGetProducts()
  const { cms_users, error: cms_err_users } = useCMSGetUsers()
  const { cms_categories, error: cms_err_categories } = useCMSGetCategories()
  const { cms_colors, error: cms_err_colors } = useCMSGetColors()
  const { cms_sizes, error: cms_err_sizes } = useCMSGetSizes()

  const handleCreate = () => router.push(APP_ROUTES.cmsOrderCreate)
  const handleEdit = useCallback(
    (_id: GridRowId) => () => {
      router.push({ pathname: APP_ROUTES.cmsOrderEdit, query: { id: _id } })
    },
    []
  )

  if (cms_err_orders || cms_err_users || cms_err_products || cms_err_categories || cms_err_colors || cms_err_sizes)
    return <Box>Failed to load</Box>
  if (!cms_orders || !cms_users || !cms_products || !cms_categories || !cms_colors || !cms_sizes)
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography mx={5}>Loading...</Typography>
      </div>
    )
  const _rows = cms_orders.map((row: CmsOrder) => {
    return {
      id: row._id,
      user_id: row.user_id,
      products: row.products,
      total_price: row.total_price,
      total_discount: row.total_discount,
      total_before_discount: row.total_before_discount,
      note: row.note,
      payment_type: row.payment_type,
      status: row.status,
      voucher_id: row.voucher_id,
      created_at: row.created_at,
      created_by: row.created_by,
      modify: row.modify
    }
  })

  const _columns: GridColDef[] = [
    {
      field: 'user_id',
      headerName: 'Order by User',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {/* <Avatar alt='Avatar' src={params.row} sx={{ mr: 2, width: 50, height: 50 }} /> */}
          {cms_users
            .filter(user => params.value.includes(user._id))
            .map(user => (
              <Typography key={user._id}>{user.email}</Typography>
            ))}
        </>
      )
    },
    {
      field: 'total_price',
      headerName: 'Total Price',
      width: 150,
      valueFormatter: ({ value }) => currencyFormatterVND(value),
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>{currencyFormatterVND(params.value)}</Typography>
          </Box>
        </>
      )
    },
    {
      field: 'note',
      headerName: 'note',
      width: 150,
      valueFormatter: ({ value }) => currencyFormatterVND(value),
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>{params.value}</Typography>
          </Box>
        </>
      )
    },
    {
      field: 'payment_type',
      headerName: 'payment_type',
      width: 150,
      valueFormatter: ({ value }) => currencyFormatterVND(value),
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>{params.value}</Typography>
          </Box>
        </>
      )
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
            bgcolor: params.value == 'verified' ? '#E0F2FE' : '#FEE2E2',
            color: params.value == 'verified' ? '#0EA5E9' : '#DC2626'
          }}
          variant='contained'
          size='small'
        >
          {params.value}
        </Button>
      )
    },
    {
      field: 'voucher_id',
      headerName: 'voucher_id',
      width: 150,
      valueFormatter: ({ value }) => currencyFormatterVND(value),
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>{params.value}</Typography>
          </Box>
        </>
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
        />
      ]
    }
  ]

  return (
    <>
      <Grid my={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' component='label' onClick={handleCreate} aria-label='add'>
          Create Order
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
    </>
  )
}

export default TableOrders
