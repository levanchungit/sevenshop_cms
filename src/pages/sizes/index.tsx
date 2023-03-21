// ** Demo Components Imports
import TableSizes from 'views/dashboard/TableSizes'
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

const Sizes = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableSizes />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Sizes
