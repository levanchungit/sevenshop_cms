import { CardHeader, Divider, Box, Card, Stack } from '@mui/material'
import CMSColorFormCreate from 'components/CMSColor/CMSColorFormCreate'

const CreateColor = () => {
  return (
    <Card>
      <CardHeader title='CREATE COLOR' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Stack bgcolor={'white'} p={5} alignItems='center'>
        <Box width={600}>
          <CMSColorFormCreate />
        </Box>
      </Stack>
    </Card>
  )
}

export default CreateColor
