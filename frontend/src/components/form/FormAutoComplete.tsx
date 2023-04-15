import React from 'react';
import {Autocomplete, FormControl, FormHelperText, FormLabel, TextField} from "@mui/material";
import {Control, Controller, RegisterOptions} from "react-hook-form";

interface FormAutoCompleteProps {
    control: Control<any>
    name: string
    label?: string
    options: any[]
    placeholder?: string
    max: number
    rules?: RegisterOptions
    getOptionLabel: (option: any) => string
}

const FormAutoComplete = ({control, name, label, max, rules, ...props}: FormAutoCompleteProps) => {

    const filterOptions = (availableOptions: Topic[], selectedValues: Topic[]) => {
        return availableOptions.filter((option) => {
            if(!selectedValues) return true
            return selectedValues.findIndex((value) => value._id === option._id) === -1;
        });
    };

    const autoCompleteRules: RegisterOptions = {
        ...rules,
        validate:(value:Topic[]) => value.length > max ? `Select upto ${max} topic` : true
    }


    return (
        <Controller
            control={control}
            name={name}
            rules={autoCompleteRules}
            render={({field, fieldState: {error}}) => (
                <FormControl margin="none" error={!!error}>
                    {label && <FormLabel>{label}</FormLabel>}

                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        filterSelectedOptions
                        filterOptions={(options) => filterOptions(options, field.value)}
                        {...field}
                        {...props}
                        onChange={(_, newValue) => {
                            if (newValue.length <= max) field.onChange(newValue)
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={props.placeholder}
                            />
                        )}
                    />

                    {error && <FormHelperText style={{margin: 0}}>{error.message}</FormHelperText>}
                </FormControl>
            )}
        >
        </Controller>
    )
}

export default FormAutoComplete;
