import { CardHeader, Divider, Box, Card, Stack } from '@mui/material'
import CMSProductFormCreate from 'components/CMSProduct/CMSProductFormCreate'

const CreateProduct = () => {
  return (
    <Card>
      <CardHeader title='CREATE PRODUCT' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Stack bgcolor={'white'} p={5} alignItems='center'>
        <Box width={600}>
          <CMSProductFormCreate />
        </Box>
      </Stack>
    </Card>
  )
}

export default CreateProduct
