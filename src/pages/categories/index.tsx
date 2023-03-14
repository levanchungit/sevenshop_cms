// ** Demo Components Imports
import TableCategories from 'views/dashboard/TableCategories'
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

const Categories = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableCategories />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Categories
