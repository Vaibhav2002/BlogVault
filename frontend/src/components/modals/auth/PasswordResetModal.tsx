import React, {useState} from 'react';
import {emailSchema, passwordSchema} from "@/utils/Validation";
import * as yup from "yup";
import PrimaryModal from "@/components/modals/PrimaryModal";
import {Alert, Box, Button, Collapse, Stack, Typography} from "@mui/material";
import styles from "@/components/modals/auth/AuthModal.module.css";
import FormTextField from "@/components/form/FormTextField";
import FormPasswordField from "@/components/form/FormPasswordField";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import MultilineText from "@/components/styled/MultilineText";
import useVerificationCode from "@/hooks/useVerificationCode";
import VerificationCodeField from "@/components/form/VerificationCodeField";
import * as dataSource from "@/data/dataSources/AuthDataSource";
import {HttpError} from "@/data/HttpErrors";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";

interface PasswordResetModalProps {
    onDismiss: () => void,
    moveToRegister: () => void,
    className?: string
}

const passwordResetSchema = yup.object({
    email: emailSchema.required('Required'),
    newPassword: passwordSchema.required('Required'),
    verificationCode: yup.number().integer('Please enter numbers only').required('Required')
})

type PasswordResetFormValues = yup.InferType<typeof passwordResetSchema>

const PasswordResetModal = ({onDismiss, moveToRegister, className}: PasswordResetModalProps) => {
    const {mutateUser} = useAuthenticatedUser()
    const {control, handleSubmit, getValues, trigger, formState: {isSubmitting}} = useForm<PasswordResetFormValues>({
        resolver: yupResolver(passwordResetSchema)
    })

    const [error, setError] = useState<string | null>(null)
    const {verificationPending, verificationCodeSending, coolDownLeft, ...verificationEvents} = useVerificationCode()

    const sendVerificationCode = async () => {
        const isValidEmail = await trigger('email')
        if (!isValidEmail) return
        const email = getValues('email')
        setError(null)
        verificationEvents.sendVerificationCode()
        try {
            await dataSource.sendPasswordResetCode(email)
            verificationEvents.onVerificationCodeSent()
        } catch (e) {
            verificationEvents.onVerificationCodeSendFailed()
            if (e instanceof HttpError) setError(e.message)
            else alert(e)
            console.error(e)
        }
    }

    const onSubmit = async (data: PasswordResetFormValues) => {
        setError(null)
        verificationEvents.removePending()
        try {
            const user = dataSource.resetPassword(data)
            await mutateUser(user)
            onDismiss()
        } catch (e) {
            if (e instanceof HttpError) setError(e.message)
            else alert(e)
            console.error(e)
        }
    }

    return (
        <PrimaryModal open onDismiss={onDismiss} className={className}>
            <Box className={styles.container}>
                <Box>
                    <Typography variant="h5" textAlign="center" marginBottom={0.5}>Reset Password</Typography>
                    <MultilineText maxLines={3} variant="subtitle2" textAlign="center" color="text.disabled">
                        Enter your email address and we will send you a verification code to reset your password
                    </MultilineText>
                </Box>

                <Collapse in={!!error} className={styles.errorAlert}>
                    <Alert severity="error">{error}</Alert>
                </Collapse>

                <Collapse in={verificationPending} sx={{width: '100%'}}>
                    <Alert severity='warning'>We sent you a verification code. Please check your inbox!</Alert>
                </Collapse>

                <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
                    <Stack spacing={2}>

                        <FormTextField
                            control={control}
                            name="email"
                            label="Email"
                            type="email"
                            inputMode="email"
                            placeholder="Enter your email"/>

                        <FormPasswordField
                            control={control}
                            name="newPassword"
                            label="New Password"
                            placeholder="Enter your new password"
                        />

                        <VerificationCodeField
                            control={control}
                            name="verificationCode"
                            onSendCode={sendVerificationCode}
                            verificationCodeSending={verificationCodeSending}
                            coolDownLeft={coolDownLeft}
                        />

                        <PrimaryButton type="submit" variant="contained" disabled={isSubmitting}>
                            Reset Password
                        </PrimaryButton>

                        <Box className={styles.switchAuthContainer}>
                            <Typography variant="body2">Don't have an account yet?</Typography>
                            <Button variant="text" sx={{padding: 0}} onClick={moveToRegister}>Register</Button>
                        </Box>

                    </Stack>
                </form>

            </Box>
        </PrimaryModal>
    )
}

export default PasswordResetModal;
