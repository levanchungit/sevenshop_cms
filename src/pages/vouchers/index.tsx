// ** Demo Components Imports
import TableVouchers from 'views/dashboard/TableVouchers'
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

const Vouchers = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableVouchers />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Vouchers
