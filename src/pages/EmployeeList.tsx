import React, { useCallback } from 'react';
import useAxios from 'axios-hooks'
import Stack from '@mui/material/Stack';
import EmployeeDataTable from '../components/EmployeeDataTable';
import Loader from '../components/Loader';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const EmployeeList = () => {
  const [{ data, loading, error }, reFetch] = useAxios<IEmployee[]>(
    '/employee'
  );
  const [{ loading: delLoading }, deleteEmployee] = useAxios(
    { method: 'DELETE' }, { manual: true }
  );
  const onDelete = useCallback(async (employeeId: number) => {
    await deleteEmployee({ url: `/employee/${employeeId}` });
    reFetch();
  }, [reFetch]);

  if (error) {
    return (
      <Alert severity="error">
        {`Error loading list: ${error}`}
      </Alert>
    )
  }

  return (
    <Stack padding={4}>
      <Toolbar  sx={{ justifyContent: 'space-between' }}>
      <Typography
          variant="h6"
          id="tableTitle"
        >
          Employees List
        </Typography>
        <Button variant='contained' href={'/add'}>
          Add Employee
        </Button>
      </Toolbar>
      <EmployeeDataTable employees={data} onDelete={onDelete}/>
      <Loader loading={loading || delLoading}/>
    </Stack>
  );
}

export default EmployeeList;
