import React, {useEffect, useState} from 'react';
import {FieldError, FieldValue, UseFormGetValues, UseFormRegisterReturn, UseFormWatch} from 'react-hook-form';
import {
    FormControl,
    FormControlProps,
    FormGroup,
    FormHelperText, FormLabel,
    InputBase,
    InputBaseProps,
    InputLabel
} from "@mui/material";
import {watch} from "fs/promises";


interface FormInputFieldProps {
    register: UseFormRegisterReturn
    fontSize?: number
    showLength?: boolean
    maxLength?: number
    value?:string
    label?:string
    fieldError: FieldError | undefined
}

const FormInputField = (
    {
        register,
        fontSize = 18,
        showLength = false,
        fieldError,
        value,
        maxLength,
        label,
        ...props
    }: FormInputFieldProps & InputBaseProps & FormControlProps
) => {
    const length = value && maxLength ? value.length+"/"+maxLength : null


    return (
        <div>
            <FormControl fullWidth error={!!fieldError}>
                <FormLabel>{label}</FormLabel>
                <InputBase
                    {...register}
                    {...props}
                    fullWidth
                    multiline
                    error={!!fieldError}
                    style={{fontSize: fontSize}}
                />
                {fieldError?.message && <FormHelperText style={{marginLeft: 0, marginRight: 0}}>{fieldError.message}</FormHelperText>}
                {showLength && length && <FormHelperText style={{display: "block", textAlign: 'end'}}>{length}</FormHelperText>}
            </FormControl>
        </div>
    )
}

export default FormInputField;
