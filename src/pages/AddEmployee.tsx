import React from 'react';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useAxios from 'axios-hooks';
import EmployeeForm, { IEmployeeFields } from '../components/EmployeeForm';
import Loader from '../components/Loader';

export const AddEmployee = () => {
  const [
    { data, loading, error },
    createEmployee
  ] = useAxios(
    {
      url: '/employee',
      method: 'POST'
    },
    { manual: true }
  )
  const navigate = useNavigate();
  const onSubmit = (data: IEmployeeFields) => {
    createEmployee({ data });
  }

  if (data && !loading) {
    navigate('/');
    return null;
  }
  return (
    <Stack direction={'column'} style={{ padding: 20 }} spacing={3}>
      {Boolean(error && !loading) &&
        <Typography variant="h6">{`Error: ${error?.response?.data?.title || error?.message || error}`}</Typography>}
      <EmployeeForm onSubmit={onSubmit}/>
      <Loader loading={loading}/>
    </Stack>
  );
};
export default AddEmployee;
