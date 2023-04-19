import React from 'react';
import {Box, Button, Modal, Stack, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import FormTextField from "@/components/form/FormTextField";
import FormPasswordField from "@/components/form/FormPasswordField";
import PrimaryButton from "@/components/styled/PrimaryButton";
import styles from "./AuthModal.module.css";
import PrimaryModal from "@/components/modals/PrimaryModal";

interface RegisterModalProps {
    onDismiss: () => void
    onMoveToLogin: () => void
    onRegisterSuccess: () => void
}

interface RegisterFormValues {
    username: string
    email: string
    password: string
}

const RegisterModal = ({onDismiss, onMoveToLogin, onRegisterSuccess}: RegisterModalProps) => {

    const {control, handleSubmit, formState: {isSubmitting}} = useForm<RegisterFormValues>()

    console.log(JSON.stringify(control))

    const onSubmit = (data: RegisterFormValues) => {
        alert(JSON.stringify(data))
        onRegisterSuccess()
    }

    return (
        <PrimaryModal open onDismiss={onDismiss}>
            <Box className={styles.container}>
                <Box>
                    <Typography variant="h5" textAlign="center" marginBottom={0.5}>Welcome to BlogVault</Typography>
                    <Typography variant="subtitle2" textAlign="center" color="text.disabled">Sign up to continue reading blogs on BlogVault</Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
                    <Stack spacing={2}>
                        <FormTextField
                            control={control}
                            name="username"
                            label="Username"
                            type="text"
                            placeholder="Enter your username"/>

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
                        >Register
                        </PrimaryButton>

                        <Box className={styles.switchAuthContainer}>
                            <Typography variant="body2">Already have an account?</Typography>
                            <Button variant="text" sx={{padding: 0}} onClick={onMoveToLogin}>Login</Button>
                        </Box>
                    </Stack>
                </form>

            </Box>
        </PrimaryModal>
    )
}

export default RegisterModal;
