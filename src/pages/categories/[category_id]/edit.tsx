import { useRouter } from 'next/router'
import { CircularProgress, Box, Typography, Card, Divider, CardHeader, Stack } from '@mui/material'
import CMSCategoryFormEdit from 'components/CMSCategory/CMSCategoryFormEdit'
import useCMSGetCategoryDetail from 'hook/category/useCMSGetDetail'

const EditCategory = () => {
  const router = useRouter()
  const product_id = router.query.id as string
  const { cmsCategory, error, isLoading, mutate } = useCMSGetCategoryDetail(product_id)

  return (
    <Card>
      <CardHeader title='UPDATE CATEGORY' titleTypographyProps={{ variant: 'h6' }} />
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
        {cmsCategory && (
          <Box width={1000}>
            <CMSCategoryFormEdit initialValues={cmsCategory.data} mutate={mutate} />
          </Box>
        )}
      </Stack>
    </Card>
  )
}

export default EditCategory
