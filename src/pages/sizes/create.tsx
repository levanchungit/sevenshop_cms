import { CardHeader, Divider, Box, Card, Stack } from '@mui/material'
import CMSSizeFormCreate from 'components/CMSSize/CMSSizeFormCreate'

const CreateSize = () => {
  return (
    <Card>
      <CardHeader title='CREATE SIZE' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Stack bgcolor={'white'} p={5} alignItems='center'>
        <Box width={600}>
          <CMSSizeFormCreate />
        </Box>
      </Stack>
    </Card>
  )
}

export default CreateSize
