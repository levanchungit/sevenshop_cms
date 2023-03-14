// ** MUI Imports
import {
  Box,
  Card,
  Typography,
  Avatar,
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
import { authAPI } from 'modules'
import {
  GridRenderCellParams,
  GridRowParams,
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridColDef,
  GridToolbar
} from '@mui/x-data-grid'
import { formatDate } from 'utils/currencyFormatter'
import { SettingsContext } from '@core/context/settingsContext'
import { useRouter } from 'next/router'
import { APP_ROUTES } from 'global/constants/index'
import useCMSGetCategories from 'hook/category/useCMSGetCategories'
import { CmsCategory } from 'interfaces/Category'

const TableCategories = () => {
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)

  //SWR
  const { cms_categories, isLoading, error, mutate } = useCMSGetCategories()

  //STATE
  const [dialogCofirm, setDialogCofirm] = useState(false)
  const [idProduct, setIdProduct] = useState<GridRowId>('')

  //HANDLER
  const handleOpenDialogCofirm = () => {
    setDialogCofirm(true)
  }
  const handleCloseDialogCofirm = () => {
    setDialogCofirm(false)
  }
  const handleDeleteProduct = async () => {
    await authAPI.deleteProduct(idProduct as string)
    mutate()
    setSnackbarAlert({ message: 'Delete Product Successfully', severity: 'success' })
    handleCloseDialogCofirm()
  }

  const handleCreate = () => router.push(APP_ROUTES.cmsProductCreate)
  const handleEdit = useCallback(
    (_id: GridRowId) => () => {
      router.push({ pathname: APP_ROUTES.cmsProductEdit, query: { id: _id } })
    },
    []
  )

  if (error) return <Box>Failed to load</Box>
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
      image: row.image,
      created_at: row.created_at,
      created_by: row.created_by,
      modify: row.modify
    }
  })

  const _columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Avatar alt='Avatar' src={params.row.image} sx={{ mr: 2, width: 50, height: 50 }} />
          {params.value}
        </>
      )
    },
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
        <Typography sx={{ fontSize: '0.875rem' }}>
          {formatDate(params.value)} | {params.row.created_by}
        </Typography>
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
            handleOpenDialogCofirm(), setIdProduct(params.id)
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
          Create
        </Button>
      </Grid>

      <Card style={{ width: '100%' }}>
        <DataGrid
          getRowId={row => row.id}
          rows={_rows}
          columns={_columns}
          slots={{ toolbar: GridToolbar }}
          sx={{
            '& .MuiDataGrid-row:hover': {
              color: 'primary.main',
              border: '1px solid red'
            },
            minHeight: 682
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10
              }
            }
          }}
          pageSizeOptions={[10]}
          checkboxSelection
        />
      </Card>

      <Dialog
        open={dialogCofirm}
        onClose={handleCloseDialogCofirm}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'INFO'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>Do you want remove ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogCofirm}>Disagree</Button>
          <Button onClick={handleDeleteProduct} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TableCategories
