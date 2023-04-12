// ** Demo Components Imports
import TablePayments from 'views/dashboard/TablePayments'
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

const Payments = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TablePayments />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Payments
