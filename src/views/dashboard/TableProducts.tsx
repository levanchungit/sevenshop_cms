// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { Avatar } from '@mui/material'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import FormAddProduct from 'views/form-layouts/FormAddProduct'

// ** Types Imports

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4
}

const TableProducts = (props: any) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Card>
      <Box sx={{ alignItems: 'flex-end', justifyItems: 'end' }}>
        <Fab onClick={handleOpen} color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </Box>

      {!props.data ? (
        <CircularProgress color='primary' />
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Storage Quantity</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((item: any, index: number) => (
                <TableRow hover key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box>
                      <Avatar alt='Avatar' src={item.image} sx={{ width: 100, height: 100 }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h3' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {item.name}
                      </Typography>
                      <Typography variant='caption'>{item.categories_type}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        sx={{
                          textDecoration: item.price_sale > 0 ? 'line-through' : null,
                          fontWeight: 500,
                          fontSize: '0.875rem !important'
                        }}
                      >
                        {item.price}
                      </Typography>
                      <Typography>{item.price_sale}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.storage_quantity}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.active ? 'true' : 'false'}
                      color={item.active ? 'success' : 'error'}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Fab color='primary' aria-label='edit'>
                        <EditIcon />
                      </Fab>
                      <Fab sx={{ marginX: 2 }} color='primary' aria-label='delete'>
                        <DeleteIcon />
                      </Fab>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <FormAddProduct />
          </Box>
        </Fade>
      </Modal>
    </Card>
  )
}

export default TableProducts
