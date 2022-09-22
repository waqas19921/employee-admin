import React, { FC } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import TextField from '@mui/material/TextField';

interface IFormInputText<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: React.InputHTMLAttributes<unknown>['type'];
}

function FormInputText<T extends FieldValues> ({ name, control, label, type }: IFormInputText<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
                 field: { onChange, value },
                 fieldState: { error },
                 formState,
               }) => (
        <TextField
          type={type}
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value || ''}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
}

export default FormInputText;
