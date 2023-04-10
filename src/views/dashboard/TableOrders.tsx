// ** MUI Imports
import {
  Box,
  Card,
  Typography,
  CircularProgress,
  ImageList,
  ImageListItem,
  SelectChangeEvent,
  Select,
  Button
} from '@mui/material'
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
  GridToolbarQuickFilter,
  useGridApiContext
} from '@mui/x-data-grid'
import { currencyFormatterVND, formatDate } from 'utils/currencyFormatter'
import { useRouter } from 'next/router'
import { APP_ROUTES, STATUS_ORDER, STATUS_ORDER_OPTIONS, STATUS_PAYMENT_OPTIONS } from 'global/constants/index'
import useCMSGetOrders from 'hook/order/useCMSGetOrders'
import { CmsOrder } from 'interfaces/Order'
import useCMSGetUsers from 'hook/user/useCMSGetUsers'
import useCMSGetProducts from 'hook/product/useCMSGetProducts'
import MenuItem from '@mui/material/MenuItem'
import { SettingsContext } from '@core/context/settingsContext'
import { useContext } from 'react'
import { ordersAPI } from 'modules'

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

type Props = {
  height: number
}

const TableOrders = (props: Props) => {
  const router = useRouter()
  const { height } = props
  const { setSnackbarAlert } = useContext(SettingsContext)

  //SWR
  const { cms_orders, cms_err_orders, cms_mutate_orders } = useCMSGetOrders()
  const { cms_products, cms_err_products } = useCMSGetProducts()
  const { cms_users, error: cms_err_users } = useCMSGetUsers()

  const handleEdit = useCallback(
    (_id: GridRowId) => () => {
      router.push({ pathname: APP_ROUTES.cmsOrderEdit, query: { id: _id } })
    },
    []
  )

  if (cms_err_orders || cms_err_users || cms_err_products) return <Box>Failed to load</Box>
  if (!cms_orders || !cms_users || !cms_products)
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

  //get status order return set bgcolor, color every status change
  const getStatusOrder = (status: string) => {
    switch (status) {
      case STATUS_ORDER.pending:
        return { bgColor: '#FFC107', color: '#000' }
      case STATUS_ORDER.verified:
        return { bgColor: '#FF9800', color: '#fff' }
      case STATUS_ORDER.shipping:
        return { bgColor: '#2196F3', color: '#fff' }
      case STATUS_ORDER.completed:
        return { bgColor: '#4CAF50', color: '#fff' }
      case STATUS_ORDER.cancelled:
        return { bgColor: '#F44336', color: '#fff' }
      default:
        return { bgColor: '#FFC107', color: '#000' }
    }
  }

  //get 1 image every products order
  const getProductsImage = (products: any) => {
    return products.map((product: any) => {
      const productDetail = cms_products.find((item: { _id: any }) => item._id === product.product_id)

      return productDetail?.images[0]
    })
  }

  const renderSelectEditInputCell: GridColDef['renderCell'] = params => {
    return <SelectEditInputCell {...params} />
  }

  function SelectEditInputCell(props: GridRenderCellParams) {
    const { id, value, field } = props
    const apiRef = useGridApiContext()

    const handleChange = async (event: SelectChangeEvent) => {
      const status = event.target.value
      try {
        await ordersAPI.updateStatusOrder({ _id: id as string, status })
        cms_mutate_orders()
        setSnackbarAlert({ message: 'Change status success', severity: 'success' })
        await apiRef.current.setEditCellValue({ id, field, value: status })
      } catch (err) {
        setSnackbarAlert({ message: 'Change status fail', severity: 'error' })
      }
      apiRef.current.stopCellEditMode({ id, field })
    }

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Select
          sx={{ width: '90%', alignItems: 'center', justifyContent: 'center' }}
          value={value}
          onChange={handleChange}
        >
          {STATUS_ORDER_OPTIONS.map((item: any) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    )
  }

  const _columns: GridColDef[] = [
    {
      field: 'user_id',
      headerName: 'Order by User',
      width: 300,
      renderCell: (params: GridRenderCellParams) => (
        <Box display={'flex'} flexDirection={'row'}>
          <Box borderRadius={20} mx={2}>
            <ImageList sx={{ width: 100, height: 100 }} cols={2}>
              {getProductsImage(params.row.products).map((item: any, index: any) => (
                <ImageListItem key={index}>
                  <img src={`${item}`} srcSet={`${item}`} alt={item?.toString()} loading='lazy' />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <Box flexDirection={'column'}>
            {cms_users
              .filter(user => params.value.includes(user._id))
              .map(user => (
                <Typography key={user._id}>{user.email}</Typography>
              ))}
            <Typography sx={{ color: 'text.secondary' }}>{params.row.products.length} products</Typography>
          </Box>
        </Box>
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
      headerName: 'Note',
      width: 100,
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
      headerName: 'Payment',
      width: 150,
      valueFormatter: ({ value }) => currencyFormatterVND(value),
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>{STATUS_PAYMENT_OPTIONS.find(item => item.value === params.value)?.label}</Typography>
          </Box>
        </>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          sx={{
            width: '100%',
            px: 2,
            py: 0.5,
            bgcolor: getStatusOrder(params.value).bgColor,
            color: getStatusOrder(params.value).color
          }}
          variant='contained'
          size='small'
        >
          {params.value}
        </Button>
      ),
      renderEditCell: renderSelectEditInputCell,
      editable: true
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
    <Card style={{ width: '100%' }}>
      <DataGrid
        getRowId={row => row.id}
        rows={_rows}
        columns={_columns}
        slots={{ toolbar: CustomToolbar }}
        getRowHeight={() => 130}
        sx={{
          '& .MuiDataGrid-row:hover': {
            color: 'primary.main',
            border: '1px solid red'
          },
          minHeight: height
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } }
        }}
        pageSizeOptions={[10, 20, 30]}
      />
    </Card>
  )
}

export default TableOrders
