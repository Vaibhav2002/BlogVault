import {Control, Controller} from "react-hook-form";
import {useState} from "react";
import {IconButton, TextField, TextFieldProps} from "@mui/material";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";

interface FormPasswordFieldProps {
    control: Control<any>,
    name: string,
    className?: string
}

const FormPasswordField = ({control, name, className, ...props}: FormPasswordFieldProps & TextFieldProps) => {

    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisibility(prev => !prev)
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState: {error}}) => (
                <TextField
                    {...field}
                    {...props}
                    variant="outlined"
                    type={isPasswordVisible ? "text" : "password"}
                    error={!!error}
                    helperText={error?.message}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? <MdVisibility/> : <MdVisibilityOff/>}
                            </IconButton>
                        )
                    }}
                />

            )}
        />
    )
}

export default FormPasswordField;
