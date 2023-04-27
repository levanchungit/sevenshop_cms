// ** MUI Imports
import { Box, Card, Typography, Grid, CircularProgress, Button, Avatar } from '@mui/material'
import { EditOutlined } from '@mui/icons-material'
import { Fragment, useCallback, useContext } from 'react'
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
import { formatDate } from 'utils/currencyFormatter'
import { SettingsContext } from '@core/context/settingsContext'
import { useRouter } from 'next/router'
import { APP_ROUTES, STATUS_USER } from 'global/constants/index'
import { CmsUser } from 'interfaces/User'
import useCMSGetUsers from 'hook/user/useCMSGetUsers'

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

const TableUsers = () => {
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)

  //SWR
  const { cms_users, error } = useCMSGetUsers()

  // //STATE
  // const [dialogConfirm, setDialogConfirm] = useState(false)
  // const [idUser, setIdUser] = useState<GridRowId>('')

  // //HANDLER
  // const handleOpenDialogConfirm = () => {
  //   setDialogConfirm(true)
  // }
  // const handleCloseDialogConfirm = () => {
  //   setDialogConfirm(false)
  // }
  // const handleDelete = async () => {
  //   await usersAPI.deleteUser(idUser as string)
  //   mutate()
  //   setSnackbarAlert({ message: 'Delete User Successfully', severity: 'success' })
  //   handleCloseDialogConfirm()
  // }

  const handleCreate = () => setSnackbarAlert({ message: 'Tính năng đang cập nhật', severity: 'success' })
  const handleEdit = useCallback(
    (_id: GridRowId) => () => {
      router.push({ pathname: APP_ROUTES.cmsCustomerEdit, query: { id: _id } })
    },
    [router]
  )

  if (error) return <div>Failed to load</div>
  if (!cms_users) return <CircularProgress />

  const _rows = cms_users.map((row: CmsUser) => {
    return {
      id: row._id,
      email: row.email,
      phone: row.phone,
      full_name: row.full_name,
      avatar: row.avatar,
      status: row.status,
      membership: row.membership,
      created_at: row.created_at,
      created_by: row.created_by
    }
  })

  const getUserStatus = (status: string) => {
    switch (status) {
      case STATUS_USER.active:
        return { bgColor: '#4CAF50', color: '#fff' }
      case STATUS_USER.inactive:
        return { bgColor: '#F44336', color: '#fff' }
      case STATUS_USER.pending:
        return { bgColor: '#FF9800', color: '#fff' }
      default:
        return { bgColor: '#F44336', color: '#fff' }
    }
  }

  const _columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 250},
    {
      field: 'full_name',
      headerName: 'Full Name',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Avatar alt='Avatar' src={params.row.avatar} sx={{ mr: 2, width: 50, height: 50 }} />
          <Typography variant='body1'>{params.value}</Typography>
        </>
      )
    },

    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      renderCell: (params: GridRenderCellParams) => <Typography variant='body1'>{params.value}</Typography>
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 100,
      renderCell: (params: GridRenderCellParams) => <Typography variant='body1'>{params.value}</Typography>
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          sx={{
            ':hover': {
              bgcolor: 'gray'
            },
            px: 2,
            bgcolor: getUserStatus(params.value).bgColor,
            color: getUserStatus(params.value).color
          }}
          variant='contained'
          size='small'
        >
          {params.value}
        </Button>
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

    // {
    //   field: 'membership',
    //   headerName: 'Membership',
    //   width: 200,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <>
    //       <Box flex={1} flexWrap={'wrap'}>
    //         <Typography sx={{ fontSize: '0.875rem' }}>{params.value}</Typography>
    //       </Box>
    //     </>
    //   )
    // },
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
          Create User
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

      {/* <Dialog
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
      </Dialog> */}
    </>
  )
}

export default TableUsers
