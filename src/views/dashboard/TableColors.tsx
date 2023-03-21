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
import * as React from 'react'
import { colorsAPI } from 'modules'
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
import { APP_ROUTES } from 'global/constants/index'
import { CmsColor } from 'interfaces/Color'
import useCMSGetColors from 'hook/color/useCMSGetColors'

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

const TableColors = () => {
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)

  //SWR
  const { cms_colors, error, mutate } = useCMSGetColors()

  //STATE
  const [dialogConfirm, setDialogConfirm] = useState(false)
  const [idColor, setIdColor] = useState<GridRowId>('')

  //HANDLER
  const handleOpenDialogConfirm = () => {
    setDialogConfirm(true)
  }
  const handleCloseDialogConfirm = () => {
    setDialogConfirm(false)
  }
  const handleDelete = async () => {
    await colorsAPI.deleteColor(idColor as string)
    mutate()
    setSnackbarAlert({ message: 'Delete Color Successfully', severity: 'success' })
    handleCloseDialogConfirm()
  }

  const handleCreate = () => router.push(APP_ROUTES.cmsColorCreate)
  const handleEdit = useCallback(
    (_id: GridRowId) => () => {
      router.push({ pathname: APP_ROUTES.cmsColorEdit, query: { id: _id } })
    },
    []
  )

  if (error) return <div>Failed to load</div>
  if (!cms_colors) return <CircularProgress />

  const _rows = cms_colors.map((row: CmsColor) => {
    return {
      id: row._id,
      name: row.name,
      code: row.code,
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
      field: ' ',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Box
            mr={1}
            sx={{
              width: 30,
              height: 30,
              border: '0.1px solid #C4C4C4',
              bgcolor: params.row.code,
              borderRadius: 10
            }}
          ></Box>
        </>
      )
    },
    {
      field: 'code',
      headerName: 'Code',
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
        />,
        <GridActionsCellItem
          color='primary'
          key={params.id}
          icon={<DeleteOutlineOutlined />}
          onClick={() => {
            handleOpenDialogConfirm(), setIdColor(params.id)
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
          Create Color
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
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TableColors
