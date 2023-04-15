import React from 'react';
import {Control, Controller, RegisterOptions} from "react-hook-form";
import {FormControl, FormControlProps, FormHelperText, TextField, TextFieldProps} from "@mui/material";

interface FormTextFieldProps {
    control: Control<any>
    name: string
    label?: string
    className?: string
    maxLength?: number
    showLength?: boolean
    rules?: RegisterOptions
}

const FormTextField = (
    {
        control,
        name,
        label,
        className,
        maxLength,
        showLength,
        rules,
        ...props
    }: FormTextFieldProps & TextFieldProps & FormControlProps
) => {
    const getLength = (value?: string) => {
        if (value && value.length > 0) return value.length + "/" + maxLength
        else return null
    }
    const fieldRules = {
        ...rules,
        maxLength: maxLength
    } as RegisterOptions

    return (
        <Controller
            name={name}
            control={control}
            rules={fieldRules}
            render={({field, fieldState: {error}}) =>

                <FormControl error={!!error}>

                    <TextField
                        variant="outlined"
                        multiline
                        {...field}
                        {...props}
                        label={label}
                        error={!!error}
                        helperText={error?.message}
                        inputProps={{maxLength: maxLength}}
                    />

                    {showLength && getLength(field.value) &&
                        <FormHelperText style={{textAlign: "end"}} error={!!error}>
                            {getLength(field.value)}
                        </FormHelperText>
                    }

                </FormControl>
            }
        />
    )
}


export default FormTextField;
