import { useRouter } from 'next/router'
import { CircularProgress, Box, Typography, Card, Divider, CardHeader, Stack } from '@mui/material'
import CMSSizeFormEdit from 'components/CMSSize/CMSSizeFormEdit'
import useCMSGetSizeDetail from 'hook/size/useCMSGetDetail'

const EditSize = () => {
  const router = useRouter()
  const size_id = router.query.id as string
  const { cmsSize, error, isLoading, mutate } = useCMSGetSizeDetail(size_id)

  return (
    <Card>
      <CardHeader title='UPDATE SIZE' titleTypographyProps={{ variant: 'h6' }} />
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
        {cmsSize && (
          <Box width={1000}>
            <CMSSizeFormEdit initialValues={cmsSize.data} mutate={mutate} />
          </Box>
        )}
      </Stack>
    </Card>
  )
}

export default EditSize
