// ** MUI Imports
import { Box, Card, Typography, CircularProgress } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { Fragment } from 'react'
import {} from 'modules'
import {
  GridRenderCellParams,
  GridRowParams,
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter
} from '@mui/x-data-grid'
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
  // const { setSnackbarAlert } = useContext(SettingsContext)

  //SWR
  const { cms_payments, error } = useCMSGetPayments()

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
          onClick={() => console.log('INFO PAYMENT')}
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
