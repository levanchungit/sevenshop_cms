// ** MUI Imports
import { Box, Card, Typography, Grid, CircularProgress, Button } from '@mui/material'
import { EditOutlined } from '@mui/icons-material'
import { Fragment, useCallback } from 'react'
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
import { useRouter } from 'next/router'
import { APP_ROUTES } from 'global/constants/index'
import { CmsSize } from 'interfaces/Size'
import useCMSGetSizes from 'hook/size/useCMSGetSizes'

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

const TableSizes = () => {
  const router = useRouter()

  // const { setSnackbarAlert } = useContext(SettingsContext)

  //SWR
  const { cms_sizes, error } = useCMSGetSizes()

  //STATE
  // const [dialogConfirm, setDialogConfirm] = useState(false)
  // const [idSize, setIdSize] = useState<GridRowId>('')

  // //HANDLER
  // const handleOpenDialogConfirm = () => {
  //   setDialogConfirm(true)
  // }
  // const handleCloseDialogConfirm = () => {
  //   setDialogConfirm(false)
  // }
  // const handleDelete = async () => {
  //   await sizesAPI.deleteSize(idSize as string)
  //   mutate()
  //   setSnackbarAlert({ message: 'Delete Size Successfully', severity: 'success' })
  //   handleCloseDialogConfirm()
  // }

  const handleCreate = () => router.push(APP_ROUTES.cmsSizeCreate)
  const handleEdit = useCallback(
    (_id: GridRowId) => () => {
      router.push({ pathname: APP_ROUTES.cmsSizeEdit, query: { id: _id } })
    },
    []
  )

  if (error) return <div>Failed to load</div>
  if (!cms_sizes) return <CircularProgress />

  const _rows = cms_sizes.map((row: CmsSize) => {
    return {
      id: row._id,
      name: row.name,
      size: row.size,
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
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'size',
      headerName: 'Size',
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
          Create Size
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

export default TableSizes
