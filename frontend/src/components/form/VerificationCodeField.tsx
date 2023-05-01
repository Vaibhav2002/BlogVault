import React from 'react';
import {Box, Button, Stack, TextFieldProps} from "@mui/material";
import FormTextField from "@/components/form/FormTextField";
import {Control} from "react-hook-form";

interface VerificationCodeFieldProps {
    control: Control<any>,
    name: string,
    label?: string,
    placeholder?: string,
    className?: string,
    onSendCode: () => void,
    verificationCodeSending: boolean,
    coolDownLeft: number
}

const VerificationCodeField = (
    {
        control,
        name,
        label,
        placeholder,
        onSendCode,
        verificationCodeSending,
        coolDownLeft,
        className,
        ...props
    }: VerificationCodeFieldProps & TextFieldProps
) => {
    return (
        <Stack direction='row' spacing={1} alignItems='stretch'>
            <Box flex={1}>
                <FormTextField
                    control={control}
                    name={name}
                    label={label || 'Verification Code'}
                    placeholder={placeholder || 'Enter your code'}
                    type='number'
                    maxLength={6}
                    {...props}
                />
            </Box>

            <Button
                onClick={onSendCode} disabled={verificationCodeSending || coolDownLeft > 0}>
                {coolDownLeft > 0 ? `Resend in ${coolDownLeft}` : 'Send Code'}
            </Button>
        </Stack>

    )
}

export default VerificationCodeField;
