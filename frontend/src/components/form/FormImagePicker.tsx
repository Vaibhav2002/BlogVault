import {Control, Controller} from "react-hook-form";
import {MuiFileInput} from "mui-file-input";

interface ImagePickerProps {
    control: Control<any>
    name: string
    label: string
    className?: string
}

const FormImagePicker = ({control, name, label, className}: ImagePickerProps) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState: {error}}) =>
                <MuiFileInput
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    label={label}
                />
            }
        />
    )
}

export default FormImagePicker