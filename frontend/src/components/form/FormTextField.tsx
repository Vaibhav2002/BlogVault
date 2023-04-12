import React from 'react';
import {Control, Controller} from "react-hook-form";
import {FormControl, FormControlProps, FormHelperText, FormLabel, InputBase, InputBaseProps} from "@mui/material";

interface FormTextFieldProps {
    control: Control<any>
    name: string
    label?: string
    className?: string
    maxLength?: number
    showLength?: boolean
}

const FormTextField = (
    {
        control,
        name,
        label,
        className,
        maxLength,
        showLength,
        ...props
    }: FormTextFieldProps & InputBaseProps & FormControlProps
) => {
    const getLength = (value?: string) => {
        if (value && value.length > 0) return value.length + "/" + maxLength
        else return null
    }
    return (
        <Controller
            name={name}
            control={control}
            rules={{maxLength: maxLength}}
            render={({field, fieldState: {error}}) =>
                <FormControl margin="none" error={!!error}>
                    {label && <FormLabel>{label}</FormLabel>}

                    <InputBase className={className} multiline fullWidth {...field} {...props}/>

                    {error && <FormHelperText style={{margin: 0}}>{error.message}</FormHelperText>}

                    {showLength && getLength(field.value) &&
                        <FormHelperText style={{textAlign: "end"}}>{getLength(field.value)}</FormHelperText>
                    }
                </FormControl>
            }
        />
    )
}


export default FormTextField;
