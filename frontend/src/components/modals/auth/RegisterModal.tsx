import React, {useState} from 'react';
import {Alert, Box, Button, Collapse, Divider, Stack, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import FormTextField from "@/components/form/FormTextField";
import FormPasswordField from "@/components/form/FormPasswordField";
import PrimaryButton from "@/components/styled/PrimaryButton";
import styles from "./AuthModal.module.css";
import PrimaryModal from "@/components/modals/PrimaryModal";
import * as dataSource from "@/data/dataSources/AuthDataSource";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import {emailSchema, passwordSchema, usernameSchema} from "@/utils/Validation";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import SocialAuthSection from "@/components/auth/SocialAuthSection";
import {HttpError} from "@/data/HttpErrors";
import useCountdown from "@/hooks/useCountdown";

interface RegisterModalProps {
    onDismiss: () => void
    onMoveToLogin: () => void
    className?: string
}

const registerSchema = yup.object({
    username: usernameSchema.required('Required'),
    email: emailSchema.required('Required'),
    password: passwordSchema.required('Required'),
    verificationCode: yup.number().integer('Please enter numbers only').required('Required')
})

type RegisterFormValues = yup.InferType<typeof registerSchema>

const RegisterModal = ({onDismiss, onMoveToLogin, className}: RegisterModalProps) => {
    const {mutateUser} = useAuthenticatedUser()

    const {control, handleSubmit, getValues, trigger, formState: {isSubmitting}} = useForm<RegisterFormValues>({
        resolver: yupResolver(registerSchema)
    })

    const coolDownTime = 30
    const {secondsLeft:codeCoolDown, start:startCodeCoolDown} = useCountdown()
    const [verificationPending, setVerificationPending] = useState(false)
    const [verificationCodeSending, setVerificationCodeSending] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)

    const onSubmit = async (data: RegisterFormValues) => {
        setVerificationPending(false)
        setError(undefined)
        try {
            const response = await dataSource.registerUser(data)
            await mutateUser(response)
            onDismiss()
        } catch (e) {
            if (e instanceof HttpError) setError(e.message)
        }
    }

    const sendVerificationCode = async () => {
        const isValidEmail = await trigger('email')
        if (!isValidEmail) return
        const email = getValues('email')
        setVerificationPending(false)
        setError(undefined)
        setVerificationCodeSending(true)
        try {
            await dataSource.sendVerificationCode(email)
            setVerificationPending(true)
            startCodeCoolDown(coolDownTime)
        } catch (e) {
            if (e instanceof HttpError)
                setError(e.message)
            console.error(e)
        } finally {
            setVerificationCodeSending(false)
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

                <Collapse in={verificationPending} sx={{width:'100%'}}>
                    <Alert severity='warning'>We sent you a verification code. Please check your inbox!</Alert>
                </Collapse>

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
                            fullWidth
                            placeholder="Enter your email"/>

                        <FormPasswordField
                            control={control}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                        />


                        <Stack direction='row' spacing={1}>
                            <Box flex={1}>
                                <FormTextField
                                    control={control}
                                    name='verificationCode'
                                    label='Verification Code'
                                    placeholder='Enter your code'
                                    type='number'
                                    maxLength={6}/>
                            </Box>

                            <Button
                                onClick={sendVerificationCode} disabled={verificationCodeSending || codeCoolDown > 0}>
                                {codeCoolDown > 0 ? `Resend in ${codeCoolDown}` : 'Send Code'}
                            </Button>
                        </Stack>


                        <PrimaryButton
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                        >Register
                        </PrimaryButton>

                        <Box className={styles.switchAuthContainer}>
                            <Typography variant="body2">Already have an account?</Typography>
                            <Button variant="text" sx={{padding: '0'}} onClick={onMoveToLogin}>Login</Button>
                        </Box>
                    </Stack>
                </form>

                <Divider variant="middle" flexItem/>

                <SocialAuthSection width={1}/>

            </Box>
        </PrimaryModal>
    )
}

export default RegisterModal;
