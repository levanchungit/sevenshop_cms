import { Button, Typography, Grid, CardContent, CardActions, MenuItem } from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { useContext, useState } from 'react'
import { useFormikCustom } from 'hook/lib'
import { InputField } from 'components/CustomFields'
import { vouchersAPI } from 'modules'
import { SettingsContext } from '@core/context/settingsContext'
import { TYPE_VOUCHER, VOUCHER_OPTIONS } from 'global/constants'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import moment from 'moment'

export default function CMSVoucherFormCreate() {
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)
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

    formik.setFieldValue('start_date', moment(start).format('YYYY-MM-DD'))
    formik.setFieldValue('end_date', moment(end).format('YYYY-MM-DD'))
  }

  const validateValue = (value: number, type: string) => {
    if (type === 'money') {
      return value > 0
    } else if (type === 'percent') {
      return value >= 0 && value <= 100
    }

    return true
  }

  const formik = useFormikCustom({
    initialValues: {
      name: '',
      type: TYPE_VOUCHER.money,
      value: 0,
      start_date: moment().format('YYYY-MM-DD'),
      end_date: moment().format('YYYY-MM-DD')
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      type: yup.string().required(),
      value: yup
        .number()
        .required()
        .test('check-value', 'Invalid value', function (value) {
          const { type } = this.parent

          return validateValue(value, type)
        }),
      start_date: yup.string().required(),
      end_date: yup.string().required()
    }),
    onSubmit: async (data, actions) => {
      console.log('onSubmit', data)
      try {
        const response = await vouchersAPI.createVoucher(data)
        if (response.status === 201) {
          setSnackbarAlert({ message: 'Add voucher successfully', severity: 'success' })
        }
        await router.back()
      } catch (e: any) {
        setSnackbarAlert({ message: e?.response.data.message, severity: 'error' })
      } finally {
        actions.setSubmitting(false)
      }
    }
  })

  console.log(formik.values.start_date, formik.values.end_date)

  const { handleSubmit, getFieldPropsCustom, errors } = formik
  console.log(errors)
  const handleBack = () => {
    router.back()
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' onSubmit={handleSubmit} noValidate>
        <CardContent>
          <Grid container spacing={5} justifyContent='center'>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. VOUCHER
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputField label='Name' required placeholder='Name' fullWidth {...getFieldPropsCustom('name')} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputField required select fullWidth label='Status' {...getFieldPropsCustom('type')}>
                {VOUCHER_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </InputField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputField
                type='number'
                inputMode='numeric'
                label='Value'
                required
                placeholder='Value'
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
                {...getFieldPropsCustom('value')}
              />
            </Grid>

            <Grid item xs={8} display='flex'>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateRangePicker
                  sx={{ flex: 1 }}
                  value={[selectedDateRange.start, selectedDateRange.end]}
                  onChange={handleDateRangeChange}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant='outlined' size='large' fullWidth onClick={handleBack}>
            Back
          </Button>
          <Button fullWidth size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            CONFIRM
          </Button>
        </CardActions>
      </Form>
    </FormikProvider>
  )
}
