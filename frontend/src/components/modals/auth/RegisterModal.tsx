import React, {useState} from 'react';
import {Alert, Box, Button, Collapse, Stack, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import FormTextField from "@/components/form/FormTextField";
import FormPasswordField from "@/components/form/FormPasswordField";
import PrimaryButton from "@/components/styled/PrimaryButton";
import styles from "./AuthModal.module.css";
import PrimaryModal from "@/components/modals/PrimaryModal";
import {registerUser} from "@/data/dataSources/AuthDataSource";

interface RegisterModalProps {
    onDismiss: () => void
    onMoveToLogin: () => void

    className?:string
}

interface RegisterFormValues {
    username: string
    email: string
    password: string
}

const RegisterModal = ({onDismiss, onMoveToLogin, className}: RegisterModalProps) => {

    const {control, handleSubmit, formState: {isSubmitting}} = useForm<RegisterFormValues>()

    const [error, setError] = useState<string | undefined>(undefined)


    const onSubmit = async (data: RegisterFormValues) => {
        try {
            const response = await registerUser(data)
        } catch (e) {
            if (e instanceof Error) setError(e.message)
        }
    }

    return (
        <PrimaryModal open onDismiss={onDismiss} className={className}>
            <Box className={styles.container}>
                <Box>
                    <Typography variant="h5" textAlign="center" marginBottom={0.5}>Welcome to BlogVault</Typography>
                    <Typography variant="subtitle2" textAlign="center" color="text.disabled">Sign up to continue reading
                        blogs on BlogVault</Typography>
                </Box>

                <Collapse in={!!error} className={styles.errorAlert}>
                    <Alert severity="error">{error}</Alert>
                </Collapse>

                <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
                    <Stack spacing={2}>
                        <FormTextField
                            control={control}
                            name="username"
                            label="Username"
                            type="text"
                            rules={{required: 'Username is required'}}
                            placeholder="Enter your username"/>

                        <FormTextField
                            control={control}
                            name="email"
                            label="Email"
                            type="email"
                            inputMode="email"
                            rules={{required: 'Email is required'}}
                            placeholder="Enter your email"/>

                        <FormPasswordField
                            control={control}
                            name="password"
                            label="Password"
                            rules={{required: 'Password is required'}}
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
