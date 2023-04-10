// ** Demo Components Imports
import TableOrders from 'views/dashboard/TableOrders'
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

const Orders = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableOrders height={800} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Orders
