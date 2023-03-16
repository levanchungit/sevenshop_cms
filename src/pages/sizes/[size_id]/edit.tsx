import { useRouter } from 'next/router'
import { CircularProgress, Box, Typography, Card, Divider, CardHeader, Stack } from '@mui/material'
import useCMSGetProductDetail from 'hook/product/useCMSGetDetail'
import CMSProductForm from 'components/CMSProduct/CMSProductFormEdit'

const EditProduct = () => {
  const router = useRouter()
  const product_id = router.query.id as string
  const { cmsProduct, error, isLoading } = useCMSGetProductDetail(product_id)

  return (
    <Card>
      <CardHeader title='UPDATE PRODUCT' titleTypographyProps={{ variant: 'h6' }} />
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
        {cmsProduct && (
          <Box width={600}>
            <CMSProductForm type='edit' initialValues={cmsProduct} />
          </Box>
        )}
      </Stack>
    </Card>
  )
}

export default EditProduct
