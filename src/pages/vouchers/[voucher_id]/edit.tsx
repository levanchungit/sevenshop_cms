import { useRouter } from 'next/router'
import { CircularProgress, Box, Typography, Card, Divider, CardHeader, Stack } from '@mui/material'
import CMSVoucherFormEdit from 'components/CMSVoucher/CMSVoucherFormEdit'
import useCMSGetVoucherDetail from 'hook/voucher/useCMSGetDetail'

const EditVoucher = () => {
  const router = useRouter()
  const voucher_id = router.query.id as string
  const { cmsVoucher, error, isLoading, mutate } = useCMSGetVoucherDetail(voucher_id)

  return (
    <Card>
      <CardHeader title='UPDATE USER' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Stack bgcolor={'white'} p={5} alignItems='center'>
        {isLoading && (
          <div
            style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
          >
            <CircularProgress />
            <Typography mx={5}>Loading...</Typography>
          </div>
        )}
        {error && <Box>Failed to load</Box>}
        {cmsVoucher && (
          <Box width={1000}>
            <CMSVoucherFormEdit initialValues={cmsVoucher.data} mutate={mutate} />
          </Box>
        )}
      </Stack>
    </Card>
  )
}

export default EditVoucher
