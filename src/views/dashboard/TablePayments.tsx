// ** MUI Imports
import {
  Box,
  Card,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { useState, Fragment, useCallback, useContext } from 'react'
import {} from 'modules'
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
import { APP_ROUTES, TYPE_VOUCHER } from 'global/constants/index'
import { CmsPayment } from 'interfaces/Payment'
import useCMSGetPayments from 'hook/payment/useCMSGetPayments'
import moment from 'moment'

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

const TablePayments = () => {
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)

  //SWR
  const { cms_payments, error } = useCMSGetPayments()

  //STATE
  const [dialogConfirm, setDialogConfirm] = useState(false)
  const [idPayment, setIdPayment] = useState<GridRowId>('')

  const handleEdit = useCallback(
    (_id: GridRowId) => () => {
      router.push({ pathname: APP_ROUTES.cmsPaymentEdit, query: { id: _id } })
    },
    [router]
  )

  if (error) return <div>Failed to load</div>
  if (!cms_payments) return <CircularProgress />
  const _rows = cms_payments.map((row: CmsPayment) => {
    return {
      id: row.id,
      amount: row.amount,
      client_secret: row.client_secret,
      created: row.created,
      currency: row.currency,
      customer: row.customer,
      metadata: row.metadata
    }
  })

  const _columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Typography variant='body1'>{params.value}</Typography>
        </>
      )
    },

    {
      field: 'client_secret',
      headerName: 'Client_secret',
      width: 300,
      renderCell: (params: GridRenderCellParams) => <Typography variant='body1'>{params.value}</Typography>
    },
    {
      field: 'currency',
      headerName: 'Currency',
      width: 100,
      renderCell: (params: GridRenderCellParams) => <Typography variant='body1'>{params.value}</Typography>
    },
    {
      field: 'customer',
      headerName: 'Customer',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Box flex={1} flexWrap={'wrap'}>
            <Typography sx={{ fontSize: '0.875rem' }}>{params.value}</Typography>
          </Box>
        </>
      )
    },
    {
      field: 'created',
      headerName: 'Time Expired',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Box flex={1} flexWrap={'wrap'}>
            <Typography sx={{ fontSize: '0.875rem' }}>{moment.unix(params.value).format('DD-MM-YYYY')}</Typography>
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
          icon={<InfoIcon />}
          onClick={handleEdit(params.id)}
          label='Info'
        />
      ]
    }
  ]

  return (
    <>
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
            minHeight: 1000
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

export default TablePayments
