// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports

const FormLayoutsBasic = () => {
  // ** States

  const [categories, setCategories] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setCategories(event.target.value)
  }

  return (
    <Card>
      <CardHeader title='Create New Product' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField fullWidth label='Name' placeholder='Product 1' />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth type='number' label='Price' helperText='Giá phải lớn hơn 0' />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Description' placeholder='...' />
            </Grid>
            <Grid item xs={12}>
              <Select
                labelId='demo-select-small'
                id='demo-select-small'
                value={categories}
                label={'1231'}
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>
            <Grid item sx={{ flexDirection: 'row' }}>
              <Button variant='contained' component='label'>
                Upload Images
                <input hidden accept='image/*' multiple type='file' />
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ flexDirection: 'row' }}>
              <FormControlLabel
                value='start'
                control={<Checkbox aria-label='12312' defaultChecked color='primary' />}
                label='Active'
                labelPlacement='start'
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button type='submit' variant='contained' size='large'>
                  CREATE
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsBasic
