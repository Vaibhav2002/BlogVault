import {Control, Controller, RegisterOptions} from "react-hook-form";
import {MuiFileInput} from "mui-file-input";

interface ImagePickerProps {
    control: Control<any>
    name: string
    rules?: RegisterOptions
    className?: string
}

const FormImagePicker = ({control, name, rules, className}: ImagePickerProps) => {
    // @ts-ignore
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({field, fieldState: {error}}) =>
                <MuiFileInput
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    label="Blog Cover Image"
                />
            }
        />
    )
}

export default FormImagePicker