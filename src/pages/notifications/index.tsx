// ** Demo Components Imports
import TableNotifications from 'views/dashboard/TableNotifications'
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'

const Notifications = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableNotifications />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Notifications
