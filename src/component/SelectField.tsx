import React from 'react';

import {FormHelperText, styled} from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, {SelectChangeEvent} from '@mui/material/Select';

import {FieldProps} from 'formik';

type SelectFieldProps = {
    field: { name: string; value: string | undefined };
    form: { setFieldValue: (name: string, value: unknown) => void };
    children?: React.ReactNode;
    inputLabel: string;
    helperText: string;
} & FieldProps;

const HelperText = styled(FormHelperText)`
  margin-left: 1rem;
`;

const ErrorHelperText = styled(FormHelperText)`
  margin-left: 0.3rem;
`;

export default function SelectField({inputLabel, field, form, children, helperText}: SelectFieldProps) {
    const {name, value} = field;
    const {setFieldValue, getFieldMeta} = form;
    const meta = getFieldMeta(name);
    const displayError = Boolean(meta.touched && meta.error);

    const handleChange = (e: SelectChangeEvent) => {
        setFieldValue(name, e.target.value);
    };

    return (
        <Box>
            <FormControl fullWidth error={displayError}>
                <InputLabel id={inputLabel + name} error={displayError}>
                    {inputLabel}
                </InputLabel>
                <Select
                    labelId={inputLabel + name}
                    id={inputLabel + name + '-id'}
                    value={value}
                    label={inputLabel}
                    onChange={handleChange}
                    name={name}
                >
                    {children}
                </Select>
            </FormControl>
            {displayError ? (
                <ErrorHelperText error={displayError}>{meta.error}</ErrorHelperText>
            ) : (
                <HelperText>{helperText}</HelperText>
            )}
        </Box>
    );
}