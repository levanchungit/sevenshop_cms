import { useRouter } from 'next/router'
import { CircularProgress, Box, Typography, Card, Divider, CardHeader, Stack } from '@mui/material'
import CMSColorFormEdit from 'components/CMSColor/CMSColorFormEdit'
import useCMSGetColorDetail from 'hook/color/useCMSGetDetail'

const EditColor = () => {
  const router = useRouter()
  const color_id = router.query.id as string
  const { cmsColor, error, isLoading, mutate } = useCMSGetColorDetail(color_id)

  return (
    <Card>
      <CardHeader title='UPDATE COLOR' titleTypographyProps={{ variant: 'h6' }} />
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
        {cmsColor && (
          <Box width={1000}>
            <CMSColorFormEdit initialValues={cmsColor.data} mutate={mutate} />
          </Box>
        )}
      </Stack>
    </Card>
  )
}

export default EditColor
