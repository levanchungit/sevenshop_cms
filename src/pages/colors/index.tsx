// ** Demo Components Imports
import TableColors from 'views/dashboard/TableColors'
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

const Colors = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableColors />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Colors
