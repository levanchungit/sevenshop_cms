// ** Demo Components Imports
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'
import Grid from '@mui/material/Grid'
import * as React from 'react'
import WeeklyOverview from 'views/dashboard/WeeklyOverview'

const Chart = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WeeklyOverview />
        </Grid>

        <Grid item xs={12} md={4} lg={3}></Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Chart
