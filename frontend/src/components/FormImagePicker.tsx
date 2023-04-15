import {Control, Controller, RegisterOptions} from "react-hook-form";
import Image from "next/image";
import placeholder from "@/assets/images/placeholder.png"
import {Input, TextField} from "@mui/material";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

interface ImagePickerProps {
    control: Control<any>
    name: string
    label:string
    rules?: RegisterOptions
    className?: string
}

const FormImagePicker = ({control, name, rules, ...props}: ImagePickerProps) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({field}) =>
                <TextField
                    {...field}
                    variant="outlined"
                    type="file"
                    accept="image/png, image/jpeg"
                />
            }
        />
    )
}

export default FormImagePicker