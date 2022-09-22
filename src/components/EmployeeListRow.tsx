import * as React from 'react';
import { useCallback } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

interface IEmployeeListRowProps {
  employee: IEmployee;
  onDelete: (id: number) => void;
}

function EmployeeListRow({ employee, onDelete }: IEmployeeListRowProps) {
  const [open, setOpen] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const triggerDelete = useCallback(async () => {
    onDelete(employee.id);
    setShowDeleteDialog(false);
  }, [onDelete, employee]);

  const toggleDeleteDialog = useCallback(() => {
    setShowDeleteDialog(show => !show);
  }, [setShowDeleteDialog])

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {employee.id}
        </TableCell>
        <TableCell align="left">{employee.firstName}</TableCell>
        <TableCell align="left">{employee.lastName}</TableCell>
        <TableCell align="left">{employee.email}</TableCell>
        <TableCell align="left">{employee.phoneNumber}</TableCell>
        <TableCell>
          <IconButton aria-label="edit" color="warning" href={`/${employee.id}`}><Edit/> </IconButton>
          <IconButton aria-label="delete" color="error" onClick={toggleDeleteDialog}><Delete/> </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Addresses
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Apartment Number</TableCell>
                    <TableCell>Street Name</TableCell>
                    <TableCell>Postal Code</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Country</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employee.addresses.map((address, index) => (
                    <TableRow key={`a-${index}-${address.apartmentNumber}-${address.streetName}`}>
                      <TableCell component="th" scope="row">
                        {address.apartmentNumber}
                      </TableCell>
                      <TableCell>{address.streetName}</TableCell>
                      <TableCell>{address.postalCode}</TableCell>
                      <TableCell>{address.state}</TableCell>
                      <TableCell>{address.country}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={showDeleteDialog}
        onClose={toggleDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm  Your Action"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDeleteDialog} color="inherit">Cancel</Button>
          <Button onClick={triggerDelete} color="error" autoFocus variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EmployeeListRow;
