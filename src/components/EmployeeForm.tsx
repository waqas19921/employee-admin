import React from 'react';

import { useForm } from "react-hook-form";
import FormInputText from "./FormInputText";
import { Button, Stack, Typography } from '@mui/material';

export type IEmployeeFields = Omit<IEmployee, 'id'>;

interface IEmployeeFormProps {
  onSubmit: (data: IEmployeeFields) => void
}

const defaultValues: IEmployeeFields = {
  addresses: [],
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: ""
};

const EmployeeForm = ({ onSubmit }: IEmployeeFormProps) => {
  const [indexes, setIndexes] = React.useState<Array<number>>([]);
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, control, setValue, register } = methods;

  const addAddress = () => {
    setIndexes(prevIndexes => [...prevIndexes, prevIndexes.length]);
  };

  const removeAddress = (index: number) => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
  };

  const clearAddresses = () => {
    setIndexes([]);
  };


  return (
    <Stack direction={'column'} style={{ padding: 20 }} spacing={3}>
      <Typography variant="h6">Add Employee Form</Typography>

      <FormInputText name="firstName" control={control} label="First Name"/>
      <FormInputText name="lastName" control={control} label="Last Name"/>
      <FormInputText name="email" control={control} label="Email"/>
      <FormInputText name="phoneNumber" control={control} label="Phone Number"/>

      {indexes.map(index => {
        const fieldName = `addresses.${index}`;
        return (
            <Stack direction={'column'} spacing={2} key={fieldName}>
              <Typography variant="h6">{`Address No: ${index}`}</Typography>
              <FormInputText name={`addresses.${index}.apartmentNumber`} type='number' control={control} label="Apartment Number"/>
              <FormInputText name={`addresses.${index}.streetName`} control={control} label="Street Name"/>
              <FormInputText name={`addresses.${index}.postalCode`} control={control} label="Postal Code"/>
              <FormInputText name={`addresses.${index}.state`} control={control} label="State"/>
              <FormInputText name={`addresses.${index}.country`} control={control} label="Country"/>
              <Button onClick={removeAddress(index)} sx={{ alignSelf: 'center' }}>
                Remove
              </Button>
            </Stack>
        );
      })}

      <Button onClick={addAddress} sx={{ alignSelf: 'center' }}>
        Add Address
      </Button>

      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Submit
      </Button>
      <Button onClick={() => reset()} variant={"outlined"}>
        Reset
      </Button>
    </Stack>
  );
};

export default EmployeeForm;
