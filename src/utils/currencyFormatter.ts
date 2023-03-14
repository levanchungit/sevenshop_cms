import moment from 'moment'

export const currencyFormatterVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

export const formatDate = (date: string) => {
  return moment(date).format('YYYY-MM-DD HH:MM')
}
