// ** MUI Imports
import {
  Box,
  Card,
  Typography,
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
import { categoriesAPI } from 'modules'
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
import { CmsCategory } from 'interfaces/Category'
import useCMSGetCategories from 'hook/category/useCMSGetCategories'

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
  const { cms_categories, error: cms_err_categories, mutate } = useCMSGetCategories()

  //STATE
  const [dialogConfirm, setDialogConfirm] = useState(false)
  const [idCategory, setIdCategory] = useState<GridRowId>('')

  //HANDLER
  const handleOpenDialogConfirm = () => {
    setDialogConfirm(true)
  }
  const handleCloseDialogConfirm = () => {
    setDialogConfirm(false)
  }
  const handleDeleteCategory = async () => {
    await categoriesAPI.deleteCategory(idCategory as string)
    mutate()
    setSnackbarAlert({ message: 'Delete Category Successfully', severity: 'success' })
    handleCloseDialogConfirm()
  }

  const handleCreate = () => router.push({ pathname: APP_ROUTES.cmsCategoryCreate })
  const handleEdit = useCallback(
    (_id: GridRowId) => () => {
      router.push({ pathname: APP_ROUTES.cmsCategoryEdit, query: { id: _id } })
    },
    [router]
  )

  if (cms_err_categories) return <Box>Failed to load</Box>
  if (!cms_categories)
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
  const _rows = cms_categories.map((row: CmsCategory) => {
    return {
      id: row._id,
      name: row.name,
      description: row.description,
      created_at: row.created_at,
      created_by: row.created_by,
      modify: row.modify
    }
  })

  const _columns: GridColDef[] = [
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
      renderCell: (params: GridRenderCellParams) => <ExpandableCell {...params} />
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
            handleOpenDialogConfirm(), setIdCategory(params.id)
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
          Create Category
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
          <Button onClick={handleDeleteCategory} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TableProducts
