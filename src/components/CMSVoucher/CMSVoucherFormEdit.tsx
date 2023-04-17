import { Button, Typography, Grid, Divider, CardContent, CardActions, MenuItem } from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { useState, useContext } from 'react'
import { useFormikCustom } from 'hook/lib'
import { VOUCHER_OPTIONS } from 'global/constants/index'
import { InputField } from 'components/CustomFields'
import { vouchersAPI } from 'modules'
import { SettingsContext } from '@core/context/settingsContext'
import { CmsVoucher } from 'interfaces/Voucher'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import moment from 'moment'

interface Props {
  initialValues: CmsVoucher
  mutate: any
}

export default function CMSVoucherFormEdit(props: Props) {
  const { initialValues, mutate } = props
  const router = useRouter()
  const { setSnackbarAlert } = useContext(SettingsContext)

  const [selectedDateRange, setSelectedDateRange] = useState({
    //get value from initialValues.start_date, initialValues.end_date
    start: moment(initialValues.start_date),
    end: moment(initialValues.end_date)
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

  const formik = useFormikCustom({
    initialValues: {
      _id: initialValues._id,
      name: initialValues.name,
      type: initialValues.type,
      quantity: initialValues.quantity,
      value: initialValues.value,
      start_date: initialValues.start_date,
      end_date: initialValues.end_date
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      type: yup.string().required(),
      quantity: yup.number().min(0).required(),
      value: yup.number().min(0).required(),
      start_date: yup.string().required(),
      end_date: yup.string().required()
    }),
    onSubmit: async (data, actions) => {
      console.log('onSubmit UPDATE', data)
      try {
        const response = await vouchersAPI.updateVoucher(data)
        if (response.status === 200) {
          setSnackbarAlert({ message: 'Update user successfully', severity: 'success' })
        }
        mutate()
      } catch (e: any) {
        setSnackbarAlert({ message: e?.response.data.message, severity: 'error' })
      } finally {
        actions.setSubmitting(false)
      }
    }
  })
  const { handleSubmit, getFieldPropsCustom } = formik

  const handleBack = () => {
    router.back()
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' onSubmit={handleSubmit} noValidate>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. USER
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputField label='Name' placeholder='Name' fullWidth {...getFieldPropsCustom('name')} />
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
                label='Quantity'
                required
                placeholder='Quantity'
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
                {...getFieldPropsCustom('quantity')}
              />
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

            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
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
