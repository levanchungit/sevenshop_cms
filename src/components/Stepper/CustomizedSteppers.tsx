import * as React from 'react'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'
import { IModifyOrder } from 'global/constants'
import { formatDate } from 'utils/currencyFormatter'
import Typography from '@mui/material/Typography'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'
  })
}))

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <AddShoppingCartOutlinedIcon />,
    2: <LocalAtmOutlinedIcon />,
    3: <LocalShippingOutlinedIcon />,
    4: <ShoppingBasketOutlinedIcon />,
    5: <StarOutlineOutlinedIcon />
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

type Props = {
  data: IModifyOrder[]
}

export default function CustomizedSteppers(props: Props) {
  const { data } = props
  console.log(data)

  //get index of status by data.status
  const getIndex = (status: string) => {
    switch (status) {
      case 'pending':
        return 0
      case 'verified':
        return 1
      case 'shipping':
        return 2
      case 'completed':
        return 3
      case 'rated':
        return 4
      case 'cancel':
        return 5
      default:
        return 0
    }
  }
  console.log(getIndex(data[data.length - 1].status))

  return (
    <Stack sx={{ width: '100%', my: 10 }} spacing={4}>
      <Stepper alternativeLabel activeStep={getIndex(data[data.length - 1].status)} connector={<ColorlibConnector />}>
        {data.map(step => (
          <Step key={step.status}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {step.status}
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {formatDate(step.modify_at)}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}
