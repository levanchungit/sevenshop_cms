import { Typography, CircularProgress, Box, Card, CardHeader, Divider, MenuItem } from '@mui/material'
import useCMSGetCategories from 'hook/category/useCMSGetCategories'
import useCMSGetColors from 'hook/color/useCMSGetColors'
import useCMSGetSizes from 'hook/size/useCMSGetSizes'
import useCMSGetOrderDetail from 'hook/order/useCMSGetDetail'
import { STATUS_ORDER_OPTIONS } from 'global/constants'
import { InputField } from 'components/CustomFields'
import CardContent from '@mui/material/CardContent'
import TableOrdersProducts from 'views/tables/TableOrdersProducts'

interface Props {
  order_id: string
}

export default function CMSOrderFormEdit(props: Props) {
  const { order_id } = props

  const { cmsOrder, error: err_order } = useCMSGetOrderDetail(order_id)
  const { cms_categories, error: err_categories } = useCMSGetCategories()
  const { cms_colors, error: err_colors } = useCMSGetColors()
  const { cms_sizes, error: err_sizes } = useCMSGetSizes()

  if (err_categories || err_colors || err_sizes || err_order) return <Box>Failed to load</Box>
  if (!cms_categories || !cms_colors || !cms_sizes || !cmsOrder)
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography mx={5}>Loading ...</Typography>
      </div>
    )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  const { _id, status } = cmsOrder?.data

  return (
    <Card>
      <Box display={'flex'} flexDirection={'row'}>
        <CardHeader title={'ID ORDER: ' + _id} sx={{ width: '70%', alignContent: 'right' }} />
        <Box sx={{ width: '30%', my: 2, mx: 4 }}>
          <form>
            <InputField fullWidth select label='Status' onChange={handleChange} value={status}>
              {STATUS_ORDER_OPTIONS.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </InputField>
          </form>
        </Box>
      </Box>

      <Divider sx={{ margin: 0 }} />

      <Box>
        <CardHeader title={'Delivery Address'} sx={{ width: '100%', alignContent: 'right' }} />
        <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
          <Typography variant='h6' sx={{ marginBottom: 2 }}>
            Chung OK 2
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>0378484047</Typography>
          <Typography variant='body2'>TPHCM</Typography>
        </CardContent>
      </Box>

      <Divider sx={{ margin: 0 }} />

      <Box>
        <CardHeader title={'Products'} sx={{ width: '100%', alignContent: 'right' }} />
        <TableOrdersProducts data={cmsOrder?.data} />
      </Box>
      <Box width={200}></Box>
    </Card>
  )
}
