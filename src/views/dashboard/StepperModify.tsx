import * as React from 'react'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import useCMSGetFeed from 'hook/dashboard/useCMSGetFeed'
import { Box } from 'mdi-material-ui'
import { CircularProgress, Typography } from '@mui/material'
import { formatDate } from 'utils/currencyFormatter'
import AddTaskIcon from '@mui/icons-material/AddTask'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: '#F7F8FA'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    width: 2,
    marginLeft: 12,
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
    //set all icons here
    1: <AddTaskIcon />,
    2: <AddTaskIcon />,
    3: <AddTaskIcon />,
    4: <AddTaskIcon />,
    5: <AddTaskIcon />,
    6: <AddTaskIcon />,
    7: <AddTaskIcon />,
    8: <AddTaskIcon />,
    9: <AddTaskIcon />,
    10: <AddTaskIcon />
  }

  //set icons all item

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

export default function CustomizedSteppers() {
  const { cms_feed, cms_err_feed } = useCMSGetFeed()

  if (cms_err_feed) return <Box>Failed to load</Box>
  if (!cms_feed)
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography mx={5}>Loading...</Typography>
      </div>
    )

  return (
    <Stack
      sx={{
        width: '100%',
        minHeight: 420,
        maxHeight: 550,
        overflow: 'scroll',
        padding: 2,
        background: 'white',
        borderRadius: 2
      }}
      spacing={4}
    >
      <Typography color={'primary.main'} fontWeight={'bold'} variant='h6'>
        Feed
      </Typography>
      <Stepper activeStep={cms_feed.orders.length} connector={<ColorlibConnector />} orientation='vertical'>
        {cms_feed.orders.map((item: any, index: any) => (
          <Step key={index}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <Typography color={'primary.main'} fontWeight={'bold'} variant='h6'>
                Order create at &nbsp;
                {formatDate(item.created_at)}
              </Typography>
              <Typography color={'primary.main'} fontWeight={'bold'} variant='caption'>
                by {item.created_by}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}
