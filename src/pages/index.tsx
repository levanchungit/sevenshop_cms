// ** MUI Imports
import { Box, Fab, Typography, Grid, Stack, CircularProgress, Card, CardContent, Avatar } from '@mui/material'

// ** Icons Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'

// ** Styled Component Import
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import WeeklyOverview from 'views/dashboard/WeeklyOverview'
import TableOrders from 'views/dashboard/TableOrdersDashboard'
import { API_ROUTES } from 'global/constants'
import useSWR from 'swr'
import { authAPI } from 'modules'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { currencyFormatterVND } from 'utils/currencyFormatter'

const arrKeywordsSearch = [
  'Backpacks',
  'Totes',
  'Boots',
  'Totes',
  'Bootsasdasdsd',
  'Totasdases',
  'Boots',
  'Toteasdasdds',
  'Boots',
  'Totadsadadses',
  'Boots',
  'Totes',
  'Boasdasdaots',
  'Boots',
  'Totes',
  'Boots',
  'Boots',
  'Totes',
  'Bootsasdasd',
  'Boots',
  'Totes',
  'Boots',
  'Boots',
  'Totesasdasdasdd',
  'Boots'
]

const arrBestSellers = [
  {
    _id: '1',
    name: 'Parisian Collage Jacquard Hoodie',
    images: ['https://res.cloudinary.com/dzhlsdyqv/image/upload/v1677641136/SevenShop/sjyrgbsgacfmdcgbh2uz.avif'],
    price: 1000000,
    sold: 151,
    profit: 151000000,
    view: 151,
    favorites: 151
  },
  {
    _id: '2',
    name: 'Parisian Collage Jacquard Hoodie',
    images: ['https://res.cloudinary.com/dzhlsdyqv/image/upload/v1677641136/SevenShop/sjyrgbsgacfmdcgbh2uz.avif'],
    price: 2000000,
    sold: 231,
    profit: 124000000,
    view: 12,
    favorites: 53
  },
  {
    _id: '3',
    name: 'Parisian Collage Jacquard Hoodie',
    images: ['https://res.cloudinary.com/dzhlsdyqv/image/upload/v1677641136/SevenShop/sjyrgbsgacfmdcgbh2uz.avif'],
    price: 123123,
    sold: 521324,
    profit: 123124432,
    view: 53,
    favorites: 643
  },
  {
    _id: '4',
    name: 'Parisian Collage Jacquard Hoodie',
    images: ['https://res.cloudinary.com/dzhlsdyqv/image/upload/v1677641136/SevenShop/sjyrgbsgacfmdcgbh2uz.avif'],
    price: 5352342,
    sold: 245,
    profit: 21314214,
    view: 53,
    favorites: 232
  },
  {
    _id: '5',
    name: 'Parisian Collage Jacquard Hoodie',
    images: ['https://res.cloudinary.com/dzhlsdyqv/image/upload/v1677641136/SevenShop/sjyrgbsgacfmdcgbh2uz.avif'],
    price: 2534654,
    sold: 24,
    profit: 23422423,
    view: 2343,
    favorites: 32
  },
  {
    _id: '6',
    name: 'Parisian Collage Jacquard Hoodie',
    images: ['https://res.cloudinary.com/dzhlsdyqv/image/upload/v1677641136/SevenShop/sjyrgbsgacfmdcgbh2uz.avif'],
    price: 233,
    sold: 23,
    profit: 21132,
    view: 134,
    favorites: 23
  },
  {
    _id: '7',
    name: 'Parisian Collage Jacquard Hoodie',
    images: ['https://res.cloudinary.com/dzhlsdyqv/image/upload/v1677641136/SevenShop/sjyrgbsgacfmdcgbh2uz.avif'],
    price: 223232,
    sold: 464,
    profit: 22323,
    view: 12321,
    favorites: 2132
  }
]

const _rows = arrBestSellers.map((row: any) => {
  return {
    id: row._id,
    name: row.name,
    images: row.images,
    price: row.price,
    sold: row.sold,
    profit: row.profit,
    view: row.view,
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
        <Avatar alt='Avatar' src={params.row.images[0]} sx={{ width: 50, height: 50 }} />

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
    width: 70
  },
  {
    field: 'profit',
    headerName: 'PROFIT',
    headerAlign: 'right',

    width: 150,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <Box width={150}>
          <Box>
            <Typography>{currencyFormatterVND(params.value)}</Typography>
          </Box>

          <Box display='flex' flexDirection={'row'} justifyContent='flex-end' alignItems={'center'}>
            <Box display='flex' flexDirection={'row'} justifyContent='flex-end' alignItems={'center'} mx={2}>
              <Typography sx={{ fontSize: 12 }}>{params.row.view}</Typography>
              <RemoveRedEyeOutlinedIcon />
            </Box>
            <Typography sx={{ fontSize: 12 }}> {params.row.favorites}</Typography>
            <FavoriteBorderOutlinedIcon />
          </Box>
        </Box>
      </>
    )
  }
]

const Dashboard = () => {
  const { data, error } = useSWR(API_ROUTES.getProducts, authAPI.getProducts)

  if (error) return <Box>Failed to load</Box>
  if (!data)
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography mx={5}>Loading...</Typography>
      </div>
    )

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
              <Typography variant='caption' color={'white'} fontWeight='bold'>
                Orders
              </Typography>
              <Typography my={1} variant='h6' color={'white'} fontWeight='bold'>
                151 345
              </Typography>
              <Box display='flex' flexDirection={'row'} alignItems='center'>
                <Fab size='small' color='secondary' aria-label='add' sx={{ bgcolor: '#13BF24', mr: 2 }}>
                  <AddCircleIcon sx={{ color: 'white' }} />
                </Fab>
                <Fab
                  variant='extended'
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#13BF24', borderRadius: 20 }}
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
              <Typography variant='caption' color={'white'} fontWeight='bold'>
                Products
              </Typography>
              <Typography my={1} variant='h6' color={'white'} fontWeight='bold'>
                12 456
              </Typography>
              <Box display='flex' flexDirection={'row'} alignItems='center'>
                <Fab size='small' color='secondary' aria-label='add' sx={{ bgcolor: '#7919FF', mr: 2 }}>
                  <AddCircleIcon sx={{ color: 'white' }} />
                </Fab>
                <Fab
                  variant='extended'
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#7919FF', borderRadius: 20 }}
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
              <Typography variant='caption' color={'white'} fontWeight='bold'>
                Categories
              </Typography>
              <Typography my={1} variant='h6' color={'white'} fontWeight='bold'>
                21
              </Typography>
              <Box display='flex' flexDirection={'row'} alignItems='center'>
                <Fab size='small' color='secondary' aria-label='add' sx={{ bgcolor: '#E64B17', mr: 2 }}>
                  <AddCircleIcon sx={{ color: 'white' }} />
                </Fab>
                <Fab
                  variant='extended'
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#E64B17', borderRadius: 20 }}
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
              <Typography variant='caption' color={'white'} fontWeight='bold'>
                Customers
              </Typography>
              <Typography my={1} variant='h6' color={'white'} fontWeight='bold'>
                1 220
              </Typography>
              <Box display='flex' flexDirection={'row'} alignItems='center'>
                <Fab size='small' color='secondary' aria-label='add' sx={{ bgcolor: '#17A5E6', mr: 2 }}>
                  <AddCircleIcon sx={{ color: 'white' }} />
                </Fab>
                <Fab
                  variant='extended'
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#17A5E6', borderRadius: 20 }}
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
              <Typography variant='caption' color={'white'} fontWeight='bold'>
                Notifications
              </Typography>
              <Typography my={1} variant='h6' color={'white'} fontWeight='bold'>
                1
              </Typography>
              <Box display='flex' flexDirection={'row'} alignItems='center'>
                <Fab size='small' color='secondary' aria-label='add' sx={{ bgcolor: '#26334D', mr: 2 }}>
                  <AddCircleIcon sx={{ color: 'white' }} />
                </Fab>
                <Fab
                  variant='extended'
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#26334D', borderRadius: 20 }}
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
              <Typography variant='caption' color={'#7D8FB3'} fontWeight='bold'>
                Vouchers
              </Typography>
              <Typography my={1} variant='h6' color={'#7D8FB3'} fontWeight='bold'>
                21
              </Typography>
              <Box display='flex' flexDirection={'row'} alignItems='center'>
                <Fab size='small' color='secondary' aria-label='add' sx={{ bgcolor: '#F7F8FA', mr: 2 }}>
                  <AddCircleIcon sx={{ color: '#7D8FB3' }} />
                </Fab>
                <Fab
                  variant='extended'
                  size='small'
                  color='secondary'
                  aria-label='add'
                  sx={{ bgcolor: '#F7F8FA', borderRadius: 20 }}
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
              {arrKeywordsSearch.map(keyword => (
                <Typography key={keyword} mx={4} my={2} variant='caption' color='#888888'>
                  {keyword}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} lg={8} display='flex' flexDirection={'column'}>
          <TableOrders data={data}></TableOrders>
        </Grid>

        <Grid item xs={12} md={6} lg={4}></Grid>

        {/* <Grid item xs={12} md={8} lg={5}>
          <Card>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                <CardContent>
                  <Typography color={'primary.main'} fontWeight={'bold'} variant='h6'>
                    Best sellers
                  </Typography>
                  <Box>
                    <DataGrid
                      key={1}
                      rows={_rows}
                      columns={_columns}
                      getRowHeight={() => 50}
                      sx={{
                        '& .MuiDataGrid-row:hover': {
                          color: 'primary.main',
                          border: '1px solid red'
                        },
                        height: 350
                      }}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5
                          }
                        }
                      }}
                      pageSizeOptions={[5]}
                      disableRowSelectionOnClick
                    />
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid> */}

        <Grid item xs={12} md={4} lg={3}>
          <WeeklyOverview />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
