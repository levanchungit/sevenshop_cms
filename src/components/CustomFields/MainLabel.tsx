import * as React from 'react'
import { Stack, Typography } from '@mui/material'
import Tag from 'components/Tag'

interface MainLabelProps {
  htmlFor?: string
  label?: React.ReactNode
  required?: boolean
}

export default function MainLabel({ label, htmlFor, required }: MainLabelProps) {
  if (!label) return null

  return (
    <Stack direction='row' spacing='10px' alignItems='center' mb='10px'>
      <Typography component='label' fontWeight='medium' fontSize={14} htmlFor={htmlFor}>
        {label}
      </Typography>
      {required && <Tag label='Required' backgroundColor={'gray'} textColor={'white'} />}
    </Stack>
  )
}
