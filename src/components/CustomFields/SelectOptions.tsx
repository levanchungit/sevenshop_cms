import React from 'react'
import { styled } from '@mui/material/styles'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface SelectProps {
  label: string
  value: string
  onChange: (event: SelectChangeEvent) => void
  options: Array<{ label: string; value: string }>
}

const StyledSelect = styled(Select)(({ theme }): any => ({
  width: '100%',
  '& .MuiSelect-select': {
    padding: '10px 14px',
    borderRadius: '4px',
    border: '1px solid #e0e0e0',
    background: '#fff',
    fontSize: '16px',
    lineHeight: 1.2,
    color: '#333',
    boxShadow: 'none',
    '&:focus': {
      borderRadius: '4px',
      backgroundColor: '#fff',
      borderColor: '#2196f3',
      boxShadow: '0 0 0 0.2rem rgba(33, 150, 243, 0.25)'
    }
  }
}))
const SelectComponent: React.FC<SelectProps> = ({ label, value, onChange, options }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value)
  }

  return (
    <FormControl variant='standard' sx={{ width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <StyledSelect label={label} value={value} onChange={handleChange}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  )
}

export default SelectComponent
