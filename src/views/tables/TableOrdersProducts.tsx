// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import useCMSGetProducts from 'hook/product/useCMSGetProducts'
import { Box } from 'mdi-material-ui'
import { currencyFormatterVND } from 'utils/currencyFormatter'
import { IProductCart } from 'global/constants'

interface Props {
  data: any
}

const TableOrdersProducts = (props: Props) => {
  const { data } = props

  const { cms_products, cms_err_products } = useCMSGetProducts()

  if (cms_err_products) {
    return <Box>Load fail</Box>
  }
  if (!cms_products) {
    return <Box>Loading...</Box>
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
        <TableBody>
          {data.products.map((row: IProductCart) => (
            <TableRow key={row._id}>
              <TableCell>{row.product_id}</TableCell>
              <TableCell align='right'>{row.color_id}</TableCell>
              <TableCell align='right'>{row.size_id}</TableCell>
              <TableCell align='right'>{row.quantity}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell />
            <TableCell colSpan={2} align='center'>
              Merchandise Subtotal
            </TableCell>
            <TableCell align='right'>{currencyFormatterVND(data.total_price)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell />
            <TableCell colSpan={2} align='center'>
              Total before discount
            </TableCell>
            <TableCell align='right'>{currencyFormatterVND(data.total_before_discount)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell />
            <TableCell colSpan={2} align='center'>
              Total discount
            </TableCell>
            <TableCell align='right'>{currencyFormatterVND(data.total_discount)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell />
            <TableCell colSpan={2} align='center'>
              Total Price
            </TableCell>
            <TableCell sx={{ fontSize: 20, fontWeight: 'bold', color: 'primary.mai' }} align='right'>
              {currencyFormatterVND(data.total_price)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell />
            <TableCell colSpan={2} align='center'>
              Payment method
            </TableCell>
            <TableCell align='right'>{data.payment_type}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableOrdersProducts
