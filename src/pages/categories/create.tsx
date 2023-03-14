import { CardHeader, Divider, Box, Card, Stack } from '@mui/material'
import CMSProductForm from 'components/CMSProduct/CMSProductForm'

const CreateProduct = () => {
  return (
    <Card>
      <CardHeader title='CREATE CATEGORY' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Stack bgcolor={'white'} p={5} alignItems='center'>
        <Box width={600}>
          <CMSProductForm type='create' />
        </Box>
      </Stack>
    </Card>
  )
}

export default CreateProduct
