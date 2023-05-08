import React from 'react';
import {Autocomplete, FormControl, FormHelperText, FormLabel, TextField} from "@mui/material";
import {Control, Controller} from "react-hook-form";

interface FormAutoCompleteProps {
    control: Control<any>
    name: string
    label?: string
    options: any[]
    placeholder?: string
    max: number
    getOptionLabel: (option: any) => string
}

const FormAutoComplete = ({control, name, label, max, ...props}: FormAutoCompleteProps) => {

    const filterOptions = (availableOptions: Topic[], selectedValues: Topic[]) => {
        return availableOptions.filter((option) => {
            if (!selectedValues) return true
            return selectedValues.findIndex((value) => value._id === option._id) === -1;
        });
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState: {error}}) => (
                <FormControl margin="none" error={!!error}>
                    {label && <FormLabel>{label}</FormLabel>}

                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        filterSelectedOptions
                        filterOptions={(options) => filterOptions(props.options, field.value)}
                        {...field}
                        {...props}
                        getOptionLabel={props.getOptionLabel}
                        onChange={(_, newValue) => field.onChange(newValue)}
                        renderInput={(params) => (
                            <TextField{...params} placeholder={props.placeholder}/>
                        )}
                    />

                    {error && <FormHelperText style={{margin: 0}}>{error.message}</FormHelperText>}
                </FormControl>
            )}
        />
    )
}

export default FormAutoComplete;
