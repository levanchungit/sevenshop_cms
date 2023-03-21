import { useRouter } from 'next/router'
import { Box, Card, Stack } from '@mui/material'
import CMSOrderFormEdit from 'components/CMSOrder/CMSOrderFormEdit'

const EditOrder = () => {
  const router = useRouter()
  const order_id = router.query.id as string

  return (
    <Card>
      <Stack bgcolor={'white'} alignItems='center'>
        <Box width={'100%'}>
          <CMSOrderFormEdit order_id={order_id} />
        </Box>
      </Stack>
    </Card>
  )
}

export default EditOrder
