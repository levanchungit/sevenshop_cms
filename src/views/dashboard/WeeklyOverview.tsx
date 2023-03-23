import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { useState } from 'react'
import useCMSGetRevenue from 'hook/revenue/useCMSGetRevenue'
import { currencyFormatterVND } from 'utils/currencyFormatter'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
const WeeklyOverview = () => {
  const { cmsRevenue, error } = useCMSGetRevenue('completed')
  console.log(cmsRevenue)

  const [options, setOptions] = useState({
    xaxis: {
      categories: cmsRevenue?.data?.results.map(item => item.date)
    }
  })

  const [series, setSeries] = useState([
    {
      name: 'Doanh thu',
      data: cmsRevenue?.data?.results.map(item => currencyFormatterVND(item.total))
    }
  ])

  return (
    <Card>
      <CardHeader
        title='Weekly Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />

      {/* create view show total */}
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          <div className='d-flex flex-column align-items-center'>
            <span className='font-weight-bold'>Doanh thu</span>
            <h1 className='font-weight-bolder mb-25'>{currencyFormatterVND(cmsRevenue?.data.total)}</h1>
          </div>
          <div className='d-flex flex-column align-items-center ml-2'>
            <span className='font-weight-bold'>Số đơn hàng</span>
            <h1 className='font-weight-bolder mb-25'>{cmsRevenue?.data.quantity}</h1>
          </div>
        </div>
      </div>

      <div className='mixed-chart'>
        {typeof window !== 'undefined' && (
          <Chart options={options} series={series} type='bar' width={'100%'} height={320} />
        )}
      </div>
    </Card>
  )
}

export default WeeklyOverview
