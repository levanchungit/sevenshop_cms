import { useRouter } from 'next/router'
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
  Card,
  Grid,
  Divider,
  MenuItem,
  CardHeader,
  InputLabel,
  CardContent,
  CardActions,
  FormControl,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { ProductData } from 'interfaces/Auth'
import useCMSGetProductDetail from 'hook/product/useCMSGetDetail'

// ** React Imports
import { ChangeEvent, forwardRef, useState } from 'react'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const EditProduct = () => {
  const router = useRouter()

  const [language, setLanguage] = useState<string[]>([])
  const [date, setDate] = useState<Date | null | undefined>(null)
  const { product_id } = router.query
  console.log(product_id)
  const [formData, setFormData] = useState<ProductData>({
    _id: '',
    name: '',
    price: 0,
    price_sale: 0,
    description: '',
    active: true,
    categories_type: '',
    storage_quantity: 0,
    images: [],
    properties_type: [],
    create_at: '',
    create_by: '',
    modify_at: '',
    modify_by: ''
  })

  const { data, error } = useCMSGetProductDetail(product_id)
  if (error) return <Box>Failed to load</Box>
  if (!data) {
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography mx={5}>Loading...</Typography>
      </div>
    )
  }

  // Handle Select
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  return (
    <Card>
      <CardHeader title='Multi Column with Form Separator' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. PRODUCT
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Name'
                placeholder='Name Product'
                value={formData.name}
                onChange={(e: ChangeEvent<any>): void => {
                  setFormData({ ...formData, name: e.target.value })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputMode='numeric'
                fullWidth
                label='Price'
                placeholder='carterLeonard'
                value={formData.price}
                onChange={(e: ChangeEvent<any>): void => {
                  setFormData({ ...formData, price: e.target.value })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Price Sale'
                placeholder='Price Sale'
                value={formData.price_sale}
                onChange={(e: ChangeEvent<any>): void => {
                  setFormData({ ...formData, price_sale: e.target.value })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Description'
                placeholder='Description'
                value={formData.description}
                onChange={(e: ChangeEvent<any>): void => {
                  setFormData({ ...formData, description: e.target.value })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Create At'
                placeholder='Create At'
                value={formData.create_at}
                onChange={(e: ChangeEvent<any>): void => {
                  setFormData({ ...formData, create_at: e.target.value })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Create By'
                placeholder='Create By'
                value={formData.create_by}
                onChange={(e: ChangeEvent<any>): void => {
                  setFormData({ ...formData, create_by: e.target.value })
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2. REVIEW
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='First Name' placeholder='Leonard' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Last Name' placeholder='Carter' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Country</InputLabel>
                <Select
                  label='Country'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-multiple-select-label'>Language</InputLabel>
                <Select
                  multiple
                  value={language}
                  onChange={handleSelectChange}
                  id='form-layouts-separator-multiple-select'
                  labelId='form-layouts-separator-multiple-select-label'
                  input={<OutlinedInput label='Language' id='select-multiple-language' />}
                >
                  <MenuItem value='English'>English</MenuItem>
                  <MenuItem value='French'>French</MenuItem>
                  <MenuItem value='Spanish'>Spanish</MenuItem>
                  <MenuItem value='Portuguese'>Portuguese</MenuItem>
                  <MenuItem value='Italian'>Italian</MenuItem>
                  <MenuItem value='German'>German</MenuItem>
                  <MenuItem value='Arabic'>Arabic</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='form-layouts-separator-date'
                onChange={(date: Date) => setDate(date)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Phone No.' placeholder='+1-123-456-8790' />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default EditProduct
