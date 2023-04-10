import React from 'react';
import {Control, Controller, RegisterOptions} from 'react-hook-form';
import {InputBase, InputBaseProps, Typography} from "@mui/material";


interface FormInputFieldProps {
    control: Control<any>
    name: string,
    defaultValue?: string
    placeholder: string
    fontSize?: number
    rules?: RegisterOptions,

    showLength?: boolean
}

const FormBaseInputField = (
    {
        name,
        control,
        defaultValue,
        rules,
        placeholder,
        fontSize = 18,
        showLength,
        ...props
    }: FormInputFieldProps & InputBaseProps
) => {

    const helperText = (value: string) => {
        return value.length + "/" + rules?.maxLength
    }

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue ?? ""}
            rules={rules}
            render={({field: {ref, ...inputProps}, fieldState: {error}}) =>
                <div>
                    <InputBase
                        inputRef={ref}
                        style={{fontSize: fontSize}}
                        inputProps={{maxLength: rules?.maxLength}}
                        placeholder={placeholder}
                        multiline
                        {...inputProps}
                        {...props}
                    />
                    {error && <Typography variant="caption" color="error">{error.message}</Typography>}
                    {showLength && inputProps.value.toString().length > 0 && <Typography
                        display='block'
                        textAlign='end'
                        color="text.disabled"
                        variant="caption"
                    >
                        {helperText(inputProps.value)}
                    </Typography>}
                </div>
            }
        />
    )
}

export default FormBaseInputField;
