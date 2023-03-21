import { CardHeader, Divider, Box, Card, Stack } from '@mui/material'
import CMSCategoryFormCreate from 'components/CMSCategory/CMSCategoryFormCreate'

const CreateCategory = () => {
  return (
    <Card>
      <CardHeader title='CREATE CATEGORY' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Stack bgcolor={'white'} p={5} alignItems='center'>
        <Box width={600}>
          <CMSCategoryFormCreate />
        </Box>
      </Stack>
    </Card>
  )
}

export default CreateCategory
