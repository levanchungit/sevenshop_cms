// ** Demo Components Imports
import TableProducts from 'views/dashboard/TableProducts'
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

const Products = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableProducts />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Products
