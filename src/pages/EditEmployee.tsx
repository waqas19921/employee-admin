import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import useAxios from 'axios-hooks';
import EmployeeForm, { IEmployeeFields } from '../components/EmployeeForm';
import Loader from '../components/Loader';
import Alert from '@mui/material/Alert';


export const EditEmployee = () => {
  let { employeeId } = useParams();
  const navigate = useNavigate();

  const [{ data: employeeData, loading: employeeLoading, error: fetchEmployeeErr }] = useAxios(
    `/employee/${employeeId}`
  )
  const [
    { data, loading, error },
    updateEmployee
  ] = useAxios(
    {
      url: `/employee/${employeeId}`,
      method: 'PUT'
    },
    { manual: true }
  )
  const onSubmit = (data: IEmployeeFields) => {
    const addresses = data.addresses.map(address => ({...address, apartmentNumber: parseInt(address.apartmentNumber.toString())}));
    const dataToSend = {...data, addresses: addresses};
    updateEmployee({ data: dataToSend })
  };

  useEffect(() => {
    if (data && !loading) {
      navigate('/');
    }
  },  [data, loading])
  if (error || fetchEmployeeErr) {
    return (
      <Alert severity="error">
        {`Got Error: ${error || fetchEmployeeErr}`}
      </Alert>
    );
  }
  if (employeeLoading) {
    return  <Loader loading={employeeLoading}/>;
  }
  return (
    <Stack direction={'column'} style={{ padding: 20 }} spacing={3}>
      <EmployeeForm employeeData={employeeData} onSubmit={onSubmit} isEditForm={true}/>
    </Stack>
  );
};
export default EditEmployee;
