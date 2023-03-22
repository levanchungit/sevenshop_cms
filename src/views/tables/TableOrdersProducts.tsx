// ** MUI Imports
import useCMSGetProducts from 'hook/product/useCMSGetProducts'
import { currencyFormatterVND } from 'utils/currencyFormatter'
import { IProductCart, STATUS_PAYMENT_OPTIONS } from 'global/constants'
import { Box, Avatar, Typography, Paper, Table, TableRow, TableBody, TableCell, TableContainer } from '@mui/material'
import useCMSGetColors from 'hook/color/useCMSGetColors'
import useCMSGetSizes from 'hook/size/useCMSGetSizes'

interface Props {
  data: any
}

const TableOrdersProducts = (props: Props) => {
  const { data } = props

  const { cms_products, cms_err_products } = useCMSGetProducts()
  const { cms_colors } = useCMSGetColors()
  const { cms_sizes } = useCMSGetSizes()

  if (cms_err_products) {
    return <Box>Load fail</Box>
  }
  if (!cms_products || !cms_colors || !cms_sizes) {
    return <Box>Loading...</Box>
  }

  //find product by product id in cms_products
  const product = (id: string) => cms_products.find((product: { _id: string }) => product._id === id)
  const color = (id: string) => cms_colors.find((color: { _id: string }) => color._id === id)
  const size = (id: string) => cms_sizes.find((size: { _id: string }) => size._id === id)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
        <TableBody>
          {data.products.map((row: IProductCart) => (
            <TableRow key={row._id}>
              <TableCell colSpan={2} sx={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
                <Avatar alt='Avatar' src={product(row.product_id)?.images[0]} sx={{ mr: 2, width: 80, height: 80 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body1'>{product(row.product_id)?.name}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box>
                      Variation: {color(row.color_id)?.name} - {size(row.size_id)?.name}
                    </Box>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align='right'>X{row.quantity}</TableCell>
              <TableCell align='right'>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography
                    variant='h4'
                    sx={{
                      textDecoration: product(row.product_id)?.price_sale > 0 ? 'line-through' : null,
                      color: product(row.product_id)?.price_sale > 0 ? '#C9C9C9' : 'red',
                      fontWeight: 500,
                      fontSize: '0.875rem !important',
                      mr: 2
                    }}
                  >
                    {currencyFormatterVND(product(row.product_id)?.price)}
                  </Typography>
                  <Typography sx={{ color: product(row.product_id)?.price_sale > 0 ? 'red' : 'black ' }}>
                    {product(row.product_id)?.price_sale > 0
                      ? currencyFormatterVND(product(row.product_id)?.price_sale)
                      : null}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={2} align='right' sx={{ borderRight: '1px solid rgba(231, 230, 232, 1)' }}>
              Merchandise Subtotal
            </TableCell>
            <TableCell align='right'>{currencyFormatterVND(data.total_price)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2} align='right' sx={{ borderRight: '1px solid rgba(231, 230, 232, 1)' }}>
              Total before discount
            </TableCell>
            <TableCell align='right'>{currencyFormatterVND(data.total_before_discount)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2} align='right' sx={{ borderRight: '1px solid rgba(231, 230, 232, 1)' }}>
              Total discount
            </TableCell>
            <TableCell align='right'>{currencyFormatterVND(data.total_discount)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2} align='right' sx={{ borderRight: '1px solid rgba(231, 230, 232, 1)' }}>
              Total Price
            </TableCell>
            <TableCell sx={{ fontSize: 20, fontWeight: 'bold', color: 'primary.mai' }} align='right'>
              {currencyFormatterVND(data.total_price)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2} align='right' sx={{ borderRight: '1px solid rgba(231, 230, 232, 1)' }}>
              Payment method
            </TableCell>
            <TableCell align='right'>
              {STATUS_PAYMENT_OPTIONS.find(item => item.value === data.payment_type)?.label}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableOrdersProducts
