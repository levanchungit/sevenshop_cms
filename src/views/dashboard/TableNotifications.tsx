// ** MUI Imports
import { Box, Card, Typography, Grid, CircularProgress, Button, Avatar } from '@mui/material'
import {
  GridRenderCellParams,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter
} from '@mui/x-data-grid'
import { formatDate } from 'utils/currencyFormatter'
import { useRouter } from 'next/router'
import { APP_ROUTES } from 'global/constants/index'
import { CmsNotification } from 'interfaces/Notification'
import useCMSGetNotifications from 'hook/notification/useCMSGetNotifications'

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

const TableNotifications = () => {
  const router = useRouter()

  //SWR
  const { cms_notifications, error } = useCMSGetNotifications()

  const handleCreate = () => router.push(APP_ROUTES.cmsNotificationCreate)

  if (error) return <div>Failed to load</div>
  if (!cms_notifications) return <CircularProgress />

  const _rows = cms_notifications.map((row: CmsNotification) => {
    return {
      id: row._id,
      title: row.title,
      body: row.body,
      image: row.image,
      from_user_id: row.from_user_id,
      from_user_full_name: row.from_user_full_name,
      to_user_id: row.to_user_id,
      created_at: row.created_at,
      created_by: row.created_by
    }
  })

  const _columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Avatar alt='Avatar' src={params.row.image} sx={{ mr: 2, width: 50, height: 50 }} />
          {params.value}
        </>
      )
    },

    {
      field: 'body',
      headerName: 'Body',
      width: 200,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },

    {
      field: 'from_user_full_name',
      headerName: 'Send by',
      width: 200,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },

    {
      field: 'to_user_id',
      headerName: 'Send To',
      width: 200,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
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
    }
  ]

  return (
    <>
      <Grid my={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' component='label' onClick={handleCreate} aria-label='add'>
          Push Notification
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
    </>
  )
}

export default TableNotifications
