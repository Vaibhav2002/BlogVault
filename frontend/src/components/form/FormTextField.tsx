import React from 'react';
import {Control, Controller} from "react-hook-form";
import {FormControl, FormHelperText, TextField, TextFieldProps} from "@mui/material";

interface FormTextFieldProps {
    control: Control<any>
    name: string
    className?: string
    maxLength?: number
    showLength?: boolean
}

const FormTextField = (
    {
        control,
        name,
        className,
        maxLength,
        showLength,
        ...props
    }: FormTextFieldProps & TextFieldProps
) => {
    const getLength = (value?: string) => {
        if (value && value.length > 0) return value.length + "/" + maxLength
        else return null
    }

    const inputProps = {
        ...props.inputProps,
        maxLength: maxLength
    }


    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) =>

                <FormControl error={!!error} fullWidth>

                    <TextField
                        variant="outlined"
                        multiline
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        inputProps={inputProps}
                        {...field}
                        {...props}
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
