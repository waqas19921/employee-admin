import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import React from 'react';
import EmployeeListRow from './EmployeeListRow';

interface IEmployeeDataTableProps {
  employees?: IEmployee[];
}

function EmployeeDataTable({employees}: IEmployeeDataTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(employees || []).map((employee) => (
            <EmployeeListRow key={employee.id} employee={employee} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EmployeeDataTable;
