import { CardHeader, Divider, Box, Card, Stack } from '@mui/material'
import CMSVoucherFormCreate from 'components/CMSVoucher/CMSVoucherFormCreate'

const CreateVoucher = () => {
  return (
    <Card>
      <CardHeader title='CREATE VOUCHER' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Stack bgcolor={'white'} p={5} alignItems='center'>
        <Box width={1000}>
          <CMSVoucherFormCreate />
        </Box>
      </Stack>
    </Card>
  )
}

export default CreateVoucher
