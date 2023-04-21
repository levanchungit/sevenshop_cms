import { CardHeader, Divider, Box, Card, Stack } from '@mui/material'
import CMSNotificationFormCreate from 'components/CMSNotification/CMSNotificationFormCreate'

const CreateNotification = () => {
  return (
    <Card>
      <CardHeader title='CREATE NOTIFICATION' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Stack bgcolor={'white'} p={5} alignItems='center'>
        <Box width={1000}>
          <CMSNotificationFormCreate />
        </Box>
      </Stack>
    </Card>
  )
}

export default CreateNotification
