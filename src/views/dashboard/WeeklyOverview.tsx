import Card from '@mui/material/Card'
import useCMSGetRevenue from 'hook/revenue/useCMSGetRevenue'
import { currencyFormatterVND } from 'utils/currencyFormatter'
import dynamic from 'next/dynamic'
import { Grid, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { STATUS_ORDER, STATUS_ORDER_OPTIONS } from 'global/constants'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import moment from 'moment'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  height: number
}

const WeeklyOverview = (props: Props) => {
  const { height } = props
  const [options, setOptions] = useState({
    xaxis: {
      categories: []
    }
  })
  const [series, setSeries] = useState([
    {
      name: 'Doanh thu',
      data: []
    }
  ])

  const [typeOrder, setTypeOrder] = useState<STATUS_ORDER>(STATUS_ORDER.completed)
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: moment(),
    end: moment()
  })

  const handleDateRangeChange = (newDateRange: [any, any]) => {
    const [start, end] = newDateRange

    //check end date < start date => set default date range is today
    if (end < start) {
      setSelectedDateRange({
        start: moment(),
        end: moment()
      })

      return
    }

    setSelectedDateRange({
      start: moment(start),
      end: moment(end)
    })
  }
  const { revenue, isError } = useCMSGetRevenue(
    typeOrder,
    moment(selectedDateRange.start).format('YYYY-MM-DD'),
    moment(selectedDateRange.end).format('YYYY-MM-DD')
  )

  useEffect(() => {
    if (revenue?.results) {
      setOptions({
        xaxis: {
          categories: revenue?.results.map((item: { date: any }) => item.date)
        }
      })
      setSeries([
        {
          name: 'Doanh thu',
          data: revenue?.results.map((item: { total: number }) => item.total.toFixed(5))
        }
      ])
    }
  }, [revenue])

  if (isError) return <Box>error</Box>
  if (!revenue) return <Box>Loading...</Box>

  //handle change type order
  const handleChange = (event: SelectChangeEvent) => {
    setTypeOrder(event.target.value as STATUS_ORDER)
  }

  return (
    <Card sx={{ p: 2, maxHeight: 1000 }}>
      <Box>
        <Grid container my={5}>
          <Grid item xs={6} display='flex' justifyContent={'center'} alignItems='center'>
            <Stack direction={'column'} justifyContent='center' alignItems={'center'} spacing={2}>
              <Typography>Doanh thu</Typography>
              <Typography variant='h5'>{currencyFormatterVND(revenue?.total)}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction={'column'} justifyContent='center' alignItems={'center'} spacing={2}>
              <Typography>Tổng số đơn hàng</Typography>
              <Typography variant='h6'>{revenue?.quantity}</Typography>
            </Stack>
          </Grid>
        </Grid>

        <Grid container my={5} justifyContent={'flex-end'} columnSpacing={2} spacing={2}>
          <Grid item xs={8} display='flex'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateRangePicker
                sx={{ flex: 1 }}
                value={[selectedDateRange.start, selectedDateRange.end]}
                onChange={handleDateRangeChange}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4} display='flex'>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Status Order</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={typeOrder}
                label='Type chart'
                onChange={handleChange}
              >
                {STATUS_ORDER_OPTIONS.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <div className='mixed-chart'>
        {typeof window !== 'undefined' && (
          <Chart options={options} series={series} type={'bar'} width={'100%'} height={height} />
        )}
      </div>
    </Card>
  )
}

export default WeeklyOverview
