// ** Demo Components Imports
import TableUsers from 'views/dashboard/TableUsers'
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

const Colors = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableUsers />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Colors
