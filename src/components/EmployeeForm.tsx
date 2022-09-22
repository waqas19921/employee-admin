import React, { useCallback } from 'react';

import { useForm } from "react-hook-form";
import FormInputText from "./FormInputText";
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export type IEmployeeFields = Omit<IEmployee, 'id'>;

interface IEmployeeFormProps {
  employeeData?: IEmployee;
  onSubmit: (data: IEmployeeFields) => void;
  isEditForm?: boolean;
}


const EmployeeForm = ({ employeeData, onSubmit, isEditForm = false }: IEmployeeFormProps) => {
  let defaultValues: IEmployeeFields = employeeData || {
    addresses: [],
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  };


  const [indexes, setIndexes] = React.useState<Array<number>>(defaultValues.addresses.map((v, i) => i));
  const [openIndexes, setOpenIndexes] = React.useState<Array<boolean>>(defaultValues.addresses.map((v, i) => false));
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, control, setValue, register } = methods;

  const addAddress = useCallback(() => {
    setIndexes(prevIndexes => [...prevIndexes, prevIndexes.length]);
    setOpenIndexes([...openIndexes, true]);
  }, []);

  const removeAddress = useCallback((index: number) => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
  }, []);

  const resetForm = useCallback(() => {
    setIndexes([]);
    reset();
  }, [reset])

  return (
    <Paper elevation={3}>
      <Stack direction={'column'} style={{ padding: 20 }} spacing={3}>
        <Typography variant="h6">{isEditForm ? 'Edit' : 'Add'} Employee Form</Typography>

        <FormInputText name="firstName" control={control} label="First Name"/>
        <FormInputText name="lastName" control={control} label="Last Name"/>
        <FormInputText name="email" control={control} label="Email"/>
        <FormInputText name="phoneNumber" control={control} label="Phone Number"/>

        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Addresses</Typography>
          <Button variant="contained" onClick={addAddress}>
            Add Address
          </Button>
        </Toolbar>

        {indexes.map(index => {
          const fieldName = `addresses.${index}`;
          return (
            <React.Fragment key={fieldName}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">{`Address No: ${index}`}</Typography>
                <div>
                  <Button onClick={removeAddress(index)} sx={{ alignSelf: 'center' }}>
                    Remove
                  </Button>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      const newOpenIndexesList = [...openIndexes];
                      newOpenIndexesList[index] = !openIndexes[index];
                      setOpenIndexes(newOpenIndexesList);
                    }}
                  >
                    {openIndexes[index] ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                  </IconButton>
                </div>
              </Stack>
              <Collapse in={openIndexes[index]} timeout="auto" unmountOnExit>
                <Stack direction={'column'} spacing={2}>
                  <FormInputText
                    name={`addresses.${index}.apartmentNumber`}
                    type="number"
                    control={control}
                    label="Apartment Number"
                  />
                  <FormInputText name={`addresses.${index}.streetName`} control={control} label="Street Name"/>
                  <FormInputText name={`addresses.${index}.postalCode`} control={control} label="Postal Code"/>
                  <FormInputText name={`addresses.${index}.state`} control={control} label="State"/>
                  <FormInputText name={`addresses.${index}.country`} control={control} label="Country"/>

                </Stack>
              </Collapse>
            </React.Fragment>
          )
        })}

        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
          Submit
        </Button>
        <Button onClick={resetForm} variant={"outlined"}>
          Reset
        </Button>
      </Stack>
    </Paper>
  );
};

export default EmployeeForm;
