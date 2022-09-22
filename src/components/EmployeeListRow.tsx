import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface IEmployeeListRowProps {
  employee: IEmployee
}

function EmployeeListRow({ employee }: IEmployeeListRowProps) {
  const [open, setOpen] = React.useState(false);

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
    </React.Fragment>
  );
}

export default EmployeeListRow;
