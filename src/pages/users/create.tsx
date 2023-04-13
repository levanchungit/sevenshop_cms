import { CardHeader, Divider, Box, Card, Stack } from '@mui/material'
import CMSUserFormCreate from 'components/CMSUser/CMSUserFormCreate'

const CreateColor = () => {
  return (
    <Card>
      <CardHeader title='CREATE USER' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Stack bgcolor={'white'} p={5} alignItems='center'>
        <Box width={600}>
          <CMSUserFormCreate />
        </Box>
      </Stack>
    </Card>
  )
}

export default CreateColor
