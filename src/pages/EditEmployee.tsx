import React from 'react';
import { redirect, useParams } from "react-router-dom";
import { Stack } from '@mui/material';
import useAxios from 'axios-hooks';
import EmployeeForm, { IEmployeeFields } from '../components/EmployeeForm';

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: ""
};

export const EditEmployee = () => {
  let { employeeId } = useParams();
  const [{ data: employeeData, loading: employeeLoading, error: fetchEmployeeErr }] = useAxios(
    `/employee/${employeeId}`
  )
  const [
    { data, loading, error },
    updateEmployee
  ] = useAxios(
    {
      url: '/employee',
      method: 'PUT'
    },
    { manual: true }
  )
  const onSubmit = (data: IEmployeeFields) => updateEmployee({ data });

  if (data && !loading) {
    redirect('/');
    return null;
  }
  if (error) {
    return <div>{`Got Error: ${error}`}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Stack direction={'column'} style={{ padding: 20 }} spacing={3}>
      <EmployeeForm onSubmit={onSubmit}/>
    </Stack>
  );
};
export default EditEmployee;
