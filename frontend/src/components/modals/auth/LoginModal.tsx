import React from 'react';
import {useForm} from "react-hook-form";
import {Box, Button, Stack, Typography} from "@mui/material";
import styles from "@/components/modals/auth/AuthModal.module.css";
import FormTextField from "@/components/form/FormTextField";
import FormPasswordField from "@/components/form/FormPasswordField";
import PrimaryButton from "@/components/styled/PrimaryButton";
import PrimaryModal from "@/components/modals/PrimaryModal";

interface LoginModalProps {
    onLoginSuccess: () => void
    onDismiss: () => void
    onMoveToRegister: () => void

    className?: string
}

interface LoginFormValues {
    email: string
    password: string
}

const LoginModal = ({onLoginSuccess, onDismiss, onMoveToRegister, className}: LoginModalProps) => {
    const {control, handleSubmit, formState: {isSubmitting}} = useForm<LoginFormValues>()

    console.log(JSON.stringify(control))

    const onSubmit = (data: LoginFormValues) => {
        alert(JSON.stringify(data))
        onLoginSuccess()
    }

    return (
        <PrimaryModal open onDismiss={onDismiss}>
            <Box className={styles.container}>
                <Box>
                    <Typography variant="h5" textAlign="center" marginBottom={0.5}>Welcome back</Typography>
                    <Typography variant="subtitle2" textAlign="center" color="text.disabled">Log in to continue using BlogVault</Typography>
                </Box>

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
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                        />

                        <PrimaryButton
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                        >Log in
                        </PrimaryButton>

                        <Box className={styles.switchAuthContainer}>
                            <Typography variant="body2">Don't have an account yet?</Typography>
                            <Button variant="text" sx={{padding: 0}} onClick={onMoveToRegister}>Register</Button>
                        </Box>
                    </Stack>
                </form>

            </Box>
        </PrimaryModal>
    )
}

export default LoginModal;
