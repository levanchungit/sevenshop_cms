import * as React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import MainLabel from './MainLabel'

export type InputFieldProps = TextFieldProps

export default function InputField(props: TextFieldProps) {
  const { label, required, ...others } = props

  return (
    <div>
      <MainLabel label={label} required={required} />
      <TextField {...others} />
    </div>
  )
}
