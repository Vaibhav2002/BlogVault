import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Alert, Box, Button, Collapse, Stack, Typography} from "@mui/material";
import styles from "@/components/modals/auth/AuthModal.module.css";
import FormTextField from "@/components/form/FormTextField";
import FormPasswordField from "@/components/form/FormPasswordField";
import PrimaryButton from "@/components/styled/PrimaryButton";
import PrimaryModal from "@/components/modals/PrimaryModal";
import {loginUser} from "@/data/dataSources/AuthDataSource";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import * as yup from "yup";
import {requiredStringSchema} from "@/utils/Validation";
import {yupResolver} from "@hookform/resolvers/yup";

interface LoginModalProps {
    onDismiss: () => void
    onMoveToRegister: () => void
    className?: string
}

const loginSchema = yup.object({
    username: requiredStringSchema,
    password: requiredStringSchema
})

type LoginFormValues = yup.InferType<typeof loginSchema>

const LoginModal = ({onDismiss, onMoveToRegister, className}: LoginModalProps) => {
    const { mutateUser } = useAuthenticatedUser()

    const {control, handleSubmit, formState: {isSubmitting}} = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema)
    })

    const [error, setError] = useState<string | undefined>(undefined)

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await loginUser(data)
            await mutateUser(response)
            onDismiss()
        } catch (e) {
            if (e instanceof Error) setError(e.message)
        }
    }

    return (
        <PrimaryModal open onDismiss={onDismiss} className={className}>
            <Box className={styles.container}>
                <Box>
                    <Typography variant="h5" textAlign="center" marginBottom={0.5}>Welcome back</Typography>
                    <Typography variant="subtitle2" textAlign="center" color="text.disabled">Log in to continue using BlogVault</Typography>
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
                            placeholder="Enter your username"/>

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
