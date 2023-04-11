import React from 'react';
import {Autocomplete, AutocompleteProps, FormControl, FormControlProps, InputBase} from "@mui/material";
import {FieldError, UseFormRegisterReturn} from "react-hook-form";

interface FormAutoCompleteProps {
    register: UseFormRegisterReturn
    fontSize?: number
    fieldError: FieldError | undefined
    options: any[]

    placeholder?: string
    getOptionLabel: (option: any) => string
}

const FormAutoComplete = ({register, fontSize, fieldError,placeholder, options, getOptionLabel, ...props}: FormAutoCompleteProps & FormControlProps) => {
    return (
        <FormControl fullWidth {...props} error={!!fieldError}>
            <Autocomplete
                {...register}
                options={options}
                includeInputInList
                autoComplete
                id="auto-complete"
                getOptionLabel={getOptionLabel}
                renderInput={ (inputProps) =>
                    <InputBase {...inputProps} placeholder={placeholder}/>
                }
            />
        </FormControl>
    )
}

export default FormAutoComplete;
