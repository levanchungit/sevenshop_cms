import { useRouter } from 'next/router'
import { CircularProgress, Box, Typography, Card, Divider, CardHeader, Stack } from '@mui/material'
import CMSUserFormEdit from 'components/CMSUser/CMSUserFormEdit'
import useCMSGetUserDetail from 'hook/user/useCMSGetDetail'

const EditUser = () => {
  const router = useRouter()
  const user_id = router.query.id as string
  const { cmsUser, error, isLoading, mutate } = useCMSGetUserDetail(user_id)

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
        {cmsUser && (
          <Box width={1000}>
            <CMSUserFormEdit initialValues={cmsUser.data} mutate={mutate} />
          </Box>
        )}
      </Stack>
    </Card>
  )
}

export default EditUser
