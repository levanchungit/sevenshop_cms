import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from '@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import TableProducts from 'views/dashboard/TableProducts'
import { authAPI } from 'modules'

const Products = () => {
  const [products, setProducts] = useState()
  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const response = await authAPI.getProducts()
      setProducts(response.data.result)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableProducts data={products} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Products
