import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useAxios from 'axios-hooks'
import Stack from '@mui/material/Stack';
import EmployeeDataTable from '../components/EmployeeDataTable';
import Loader from '../components/Loader';

const EmployeeList = () => {
  const [{ data, loading, error }] = useAxios<IEmployee[]>(
    '/employee'
  );
  return (
    <Stack padding={4}>
      <EmployeeDataTable employees={data} />
      <Fab sx={{ alignSelf: 'flex-end', margin: 2 }} color="primary" aria-label="add" href={'/add'}>
        <AddIcon/>
      </Fab>
      <Loader loading={loading}/>
    </Stack>
  );
}

export default EmployeeList;
