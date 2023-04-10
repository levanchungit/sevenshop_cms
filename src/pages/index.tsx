// ** MUI Imports
import { Box, Typography, Grid, CircularProgress, Fab, Stack, Avatar, CardContent } from '@mui/material'

// ** Styled Component Import
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import WeeklyOverview from 'views/dashboard/WeeklyOverview'
import { API_ROUTES, APP_ROUTES } from 'global/constants'
import useSWR from 'swr'
import { productsAPI } from 'modules'

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { currencyFormatterVND } from 'utils/currencyFormatter'
import useCMSGetCountQuantity from 'hook/dashboard/useCMSGetCountQuantity'
import { useRouter } from 'next/router'
import useCMSGetHistorySearch from 'hook/dashboard/useCMSGetHistorySearch'
import { cmsHistorySearch, cmsProductsBestSellers } from 'interfaces/Dashboard'
import useCMSGetProductsBestSellers from 'hook/dashboard/useCMSGetProductsBestSellers'
import TableOrders from 'views/dashboard/TableOrders'

const Dashboard = () => {
  const router = useRouter()
  const { data, error } = useSWR(API_ROUTES.getProducts, productsAPI.getProducts)

  const { cms_count_quantity, cms_err_count_quantity } = useCMSGetCountQuantity()
  const { cms_history_search, cms_err_history_search } = useCMSGetHistorySearch()
  const { cms_products_best_sellers, cms_err_products_best_sellers } = useCMSGetProductsBestSellers()

  if (error) return <Box>Failed to load</Box>
  if (!data)
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography mx={5}>Loading...</Typography>
      </div>
    )

  if (cms_err_count_quantity || cms_err_history_search || cms_err_products_best_sellers)
    return <Box>Failed to load</Box>
  if (!cms_count_quantity || !cms_history_search || !cms_products_best_sellers)
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography mx={5}>Loading...</Typography>
      </div>
    )

  const _rows = cms_products_best_sellers.map((row: cmsProductsBestSellers) => {
    return {
      id: row._id,
      name: row.product_name,
      image: row.image,
      price: row.price,
      price_sale: row.price_sale,
      sold: row.sold_quantity,
      profit: row.total_revenue,
      view: row.views,
      favorites: row.favorites
    }
  })

  const _columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'PRODUCT',
      width: 300,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Avatar alt='Avatar' src={params.row.image} sx={{ width: 50, height: 50 }} />

          <Stack>
            <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>{params.value}</Typography>

            <Typography>{currencyFormatterVND(params.row.price)}</Typography>
          </Stack>
        </>
      )
    },
    {
      field: 'sold',
      headerName: 'SOLD',
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Box width={150}>
            <Box>
              <Typography>{params.value}</Typography>
            </Box>
          </Box>
        </>
      )
    },
    {
      field: 'profit',
      headerName: 'PROFIT',
      headerAlign: 'right',

      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Box width={150}>
            <Box>
              <Typography>{currencyFormatterVND(params.value)}</Typography>
            </Box>

            <Box display='flex' flexDirection={'row'} justifyContent='flex-end' alignItems={'center'}>
              <Box display='flex' flexDirection={'row'} justifyContent='flex-end' alignItems={'center'} mx={2}>
                <Typography sx={{ fontSize: 12, mr: 0.5 }}>{params.row.view}</Typography>
                <RemoveRedEyeOutlinedIcon />
              </Box>
              <Typography sx={{ fontSize: 12, ml: 2 }}> {params.row.favorites}</Typography>
              <FavoriteBorderOutlinedIcon />
            </Box>
          </Box>
        </>
      )
    }
  ]

  return (
    <ApexChartWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4} display='flex' flexDirection={'column'}>
          <Box display='flex' flexDirection={'row'}>
            <Grid
              item
              xs={12 / 3 - 8}
              height={126}
              ml={1}
              p={2}
              display={'flex'}
              flexDirection='column'
              borderRadius={1.2}
              alignItems='center'
              justifyContent={'center'}
              bgcolor='#29CC39'
            >
              <Typography variant='caption' color={'white'} fontWeight='bold' textTransform={'capitalize'}>
                {Object.keys(cms_count_quantity)[0]}
              </Typography>
              <Typography my={1} variant='h6' color={'white'} fontWeight='bold'>
                {cms_count_quantity.orders}
              </Typography>
              <Box display='flex' flexDirection={'row'} alignItems='center'>
                <Fab
                  onClick={() => {
                    router.push(APP_ROUTES.cmsOrders)
                  }}
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#13BF24', mr: 2 }}
                >
                  <AddCircleIcon sx={{ color: 'white' }} />
                </Fab>
                <Fab
                  variant='extended'
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#13BF24', borderRadius: 20 }}
                  onClick={() => {
                    router.push(APP_ROUTES.cmsOrders)
                  }}
                >
                  <Stack sx={{ height: 'auto', color: 'white', fontWeight: 'bold', fontSize: 12 }}>View All</Stack>
                </Fab>
              </Box>
            </Grid>
            <Grid
              item
              xs={12 / 3 - 8}
              height={126}
              ml={1}
              p={2}
              display={'flex'}
              flexDirection='column'
              borderRadius={1.2}
              alignItems='center'
              justifyContent={'center'}
              bgcolor='#8833FF'
            >
              <Typography variant='caption' color={'white'} fontWeight='bold' textTransform={'capitalize'}>
                {Object.keys(cms_count_quantity)[1]}
              </Typography>
              <Typography my={1} variant='h6' color={'white'} fontWeight='bold'>
                {cms_count_quantity.products}
              </Typography>
              <Box display='flex' flexDirection={'row'} alignItems='center'>
                <Fab
                  onClick={() => {
                    router.push(APP_ROUTES.cmsProductCreate)
                  }}
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#7919FF', mr: 2 }}
                >
                  <AddCircleIcon sx={{ color: 'white' }} />
                </Fab>
                <Fab
                  variant='extended'
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#7919FF', borderRadius: 20 }}
                  onClick={() => {
                    router.push(APP_ROUTES.cmsProducts)
                  }}
                >
                  <Stack sx={{ height: 'auto', color: 'white', fontWeight: 'bold', fontSize: 12 }}>View All</Stack>
                </Fab>
              </Box>
            </Grid>
            <Grid
              item
              xs={12 / 3 - 8}
              height={126}
              ml={1}
              p={2}
              display={'flex'}
              flexDirection='column'
              borderRadius={1.2}
              alignItems='center'
              justifyContent={'center'}
              bgcolor='#FF6633'
            >
              <Typography variant='caption' color={'white'} fontWeight='bold' textTransform={'capitalize'}>
                {Object.keys(cms_count_quantity)[2]}
              </Typography>
              <Typography my={1} variant='h6' color={'white'} fontWeight='bold'>
                {cms_count_quantity.categories}
              </Typography>
              <Box display='flex' flexDirection={'row'} alignItems='center'>
                <Fab
                  onClick={() => {
                    router.push(APP_ROUTES.cmsCategoryCreate)
                  }}
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#E64B17', mr: 2 }}
                >
                  <AddCircleIcon sx={{ color: 'white' }} />
                </Fab>
                <Fab
                  variant='extended'
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#E64B17', borderRadius: 20 }}
                  onClick={() => {
                    router.push(APP_ROUTES.cmsCategories)
                  }}
                >
                  <Stack sx={{ height: 'auto', color: 'white', fontWeight: 'bold', fontSize: 12 }}>View All</Stack>
                </Fab>
              </Box>
            </Grid>
          </Box>
          <Box display='flex' flexDirection={'row'}>
            <Grid
              item
              xs={12 / 3 - 8}
              height={126}
              ml={1}
              mt={1}
              p={2}
              display={'flex'}
              flexDirection='column'
              borderRadius={1.2}
              alignItems='center'
              justifyContent={'center'}
              bgcolor='#33BFFF'
            >
              <Typography variant='caption' color={'white'} fontWeight='bold' textTransform={'capitalize'}>
                {Object.keys(cms_count_quantity)[3]}
              </Typography>
              <Typography my={1} variant='h6' color={'white'} fontWeight='bold'>
                {cms_count_quantity.users}
              </Typography>
              <Box display='flex' flexDirection={'row'} alignItems='center'>
                <Fab
                  onClick={() => {
                    router.push(APP_ROUTES.cmsUserCreate)
                  }}
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#17A5E6', mr: 2 }}
                >
                  <AddCircleIcon sx={{ color: 'white' }} />
                </Fab>
                <Fab
                  variant='extended'
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#17A5E6', borderRadius: 20 }}
                  onClick={() => {
                    router.push(APP_ROUTES.cmsUsers)
                  }}
                >
                  <Stack sx={{ height: 'auto', color: 'white', fontWeight: 'bold', fontSize: 12 }}>View All</Stack>
                </Fab>
              </Box>
            </Grid>
            <Grid
              item
              xs={12 / 3 - 8}
              height={126}
              ml={1}
              mt={1}
              p={2}
              display={'flex'}
              flexDirection='column'
              borderRadius={1.2}
              alignItems='center'
              justifyContent={'center'}
              bgcolor='#1A2233'
            >
              <Typography variant='caption' color={'white'} fontWeight='bold' textTransform={'capitalize'}>
                {Object.keys(cms_count_quantity)[4]}
              </Typography>
              <Typography my={1} variant='h6' color={'white'} fontWeight='bold'>
                {cms_count_quantity.notifications}
              </Typography>
              <Box display='flex' flexDirection={'row'} alignItems='center'>
                <Fab
                  onClick={() => {
                    router.push(APP_ROUTES.cmsNotificationCreate)
                  }}
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#26334D', mr: 2 }}
                >
                  <AddCircleIcon sx={{ color: 'white' }} />
                </Fab>
                <Fab
                  variant='extended'
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#26334D', borderRadius: 20 }}
                  onClick={() => {
                    router.push(APP_ROUTES.cmsNotifications)
                  }}
                >
                  <Stack sx={{ height: 'auto', color: 'white', fontWeight: 'bold', fontSize: 12 }}>View All</Stack>
                </Fab>
              </Box>
            </Grid>
            <Grid
              item
              xs={12 / 3 - 8}
              height={126}
              ml={1}
              mt={1}
              p={2}
              display={'flex'}
              flexDirection='column'
              borderRadius={1.2}
              alignItems='center'
              justifyContent={'center'}
              bgcolor='#FFFFFF'
            >
              <Typography variant='caption' color={'#7D8FB3'} fontWeight='bold' textTransform={'capitalize'}>
                {Object.keys(cms_count_quantity)[5]}
              </Typography>
              <Typography my={1} variant='h6' color={'#7D8FB3'} fontWeight='bold'>
                {cms_count_quantity.vouchers}
              </Typography>
              <Box display='flex' flexDirection={'row'} alignItems='center'>
                <Fab
                  onClick={() => {
                    router.push(APP_ROUTES.cmsVoucherCreate)
                  }}
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#F7F8FA', mr: 2 }}
                >
                  <AddCircleIcon sx={{ color: '#7D8FB3' }} />
                </Fab>
                <Fab
                  variant='extended'
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#F7F8FA', borderRadius: 20 }}
                  onClick={() => {
                    router.push(APP_ROUTES.cmsVouchers)
                  }}
                >
                  <Stack sx={{ height: 'auto', color: '#7D8FB3', fontWeight: 'bold', fontSize: 12 }}>View All</Stack>
                </Fab>
              </Box>
            </Grid>
          </Box>
          <Box maxHeight={150} display='flex' p={5} flexDirection='row' flexWrap={'wrap'} overflow={'hidden'}>
            <Typography width={'100%'} variant='h6' fontWeight={'bold'} color='primary.main'>
              Top keywords search
            </Typography>
            <Box display='flex' flexWrap={'wrap'}>
              {cms_history_search.map((item: cmsHistorySearch) => (
                <Typography key={item._id} mx={4} my={2} variant='caption' color='#888888'>
                  {item.keyword}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} lg={8} display='flex' flexDirection={'column'}>
          <TableOrders height={400} />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          Stepper
        </Grid>

        <Grid item xs={12} md={8} lg={5}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <CardContent sx={{ backgroundColor: 'white', borderRadius: 1 }}>
                <Typography color={'primary.main'} fontWeight={'bold'} variant='h6'>
                  Best sellers
                </Typography>
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={_rows}
                    columns={_columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5
                        }
                      }
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                  />
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <WeeklyOverview />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
