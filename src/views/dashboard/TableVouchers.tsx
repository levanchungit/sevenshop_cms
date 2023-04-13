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
  DialogActions
} from '@mui/material'
import { EditOutlined, DeleteOutlineOutlined } from '@mui/icons-material'
import { useState, Fragment, useCallback, useContext } from 'react'
import { vouchersAPI } from 'modules'
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
import { CmsVoucher } from 'interfaces/Voucher'
import useCMSGetVouchers from 'hook/voucher/useCMSGetVouchers'

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

const TableVouchers = () => {
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)

  //SWR
  const { cms_vouchers, error, mutate } = useCMSGetVouchers()

  //STATE
  const [dialogConfirm, setDialogConfirm] = useState(false)
  const [idVoucher, setIdVoucher] = useState<GridRowId>('')

  //HANDLER
  const handleOpenDialogConfirm = () => {
    setDialogConfirm(true)
  }
  const handleCloseDialogConfirm = () => {
    setDialogConfirm(false)
  }
  const handleDelete = async () => {
    await vouchersAPI.deleteVoucher(idVoucher as string)
    mutate()
    setSnackbarAlert({ message: 'Delete Voucher Successfully', severity: 'success' })
    handleCloseDialogConfirm()
  }

  const handleCreate = () => router.push(APP_ROUTES.cmsVoucherCreate)
  const handleEdit = useCallback(
    (_id: GridRowId) => () => {
      router.push({ pathname: APP_ROUTES.cmsVoucherEdit, query: { id: _id } })
    },
    [router]
  )

  if (error) return <div>Failed to load</div>
  if (!cms_vouchers) return <CircularProgress />

  const _rows = cms_vouchers.map((row: CmsVoucher) => {
    return {
      id: row._id,
      name: row.name,
      type: row.type,
      value: row.value,
      start_date: row.start_date,
      end_date: row.end_date,
      created_at: row.created_at,
      created_by: row.created_by
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
          <Typography variant='body1'>{params.value}</Typography>
        </>
      )
    },

    {
      field: 'type',
      headerName: 'Type',
      width: 200,
      renderCell: (params: GridRenderCellParams) => <Typography variant='body1'>{params.value}</Typography>
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body1'>
          {params.row.type === TYPE_VOUCHER.money ? currencyFormatterVND(params.value) : params.value + '%'}
        </Typography>
      )
    },
    {
      field: 'start_date',
      headerName: 'Time Expired',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Box flex={1} flexWrap={'wrap'}>
            <Typography sx={{ fontSize: '0.875rem' }}>{formatDate(params.value)}</Typography>
            <Typography sx={{ fontSize: '0.875rem' }}>{formatDate(params.row.end_date)}</Typography>
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
        />,
        <GridActionsCellItem
          color='primary'
          key={params.id}
          icon={<DeleteOutlineOutlined />}
          onClick={() => {
            handleOpenDialogConfirm(), setIdVoucher(params.id)
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
          Create Voucher
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
            minHeight: 1000
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
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TableVouchers
