import React, {useState} from 'react';
import PrimaryModal from "@/components/modals/PrimaryModal";
import {Alert, Box, Collapse, Stack, Typography} from "@mui/material";
import MultilineText from "@/components/styled/MultilineText";
import {usernameSchema} from "@/utils/Validation";
import * as yup from 'yup'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as userDataSource from "@/data/dataSources/UserDataSource";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import {HttpError} from "@/data/HttpErrors";
import FormTextField from "@/components/form/FormTextField";
import PrimaryButton from "@/components/styled/PrimaryButton";

interface OnBoardingModalProps {
    className?: string
}

const onboardingSchema = yup.object({
    username: usernameSchema.required('Username is required')
})

type OnboardingValues = yup.InferType<typeof onboardingSchema>

const OnBoardingModal = ({className}: OnBoardingModalProps) => {

    const {mutateUser} = useAuthenticatedUser()

    const {handleSubmit,control, formState:{isSubmitting}} = useForm<OnboardingValues>({
        resolver: yupResolver(onboardingSchema)
    })

    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: OnboardingValues) => {
        try{
            setError(null)
            const response = await userDataSource.updateUserProfile(data)
            await mutateUser(response)
        }catch(e){
            if(e instanceof HttpError)
                setError(e.message)
            console.log(e)
        }
    }

    return (
        <PrimaryModal open={true} onDismiss={() => {}}>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Stack direction="column" spacing={2}>

                        <Box>
                            <Typography variant="h5">Add Username</Typography>
                            <MultilineText maxLines={3} variant="body2" color="text.secondary">
                                Choose a username for your account. This can be changed later.
                            </MultilineText>
                        </Box>

                        <Collapse in={!!error}>
                            <Alert severity="error">{error}</Alert>
                        </Collapse>

                        <FormTextField
                            control={control}
                            name="username"
                            label="Username"
                            multiline={false}
                            placeholder="Enter your username"
                        />

                        <PrimaryButton type="submit" variant="contained">Submit</PrimaryButton>

                    </Stack>
                </form>

        </PrimaryModal>
    )
}

export default OnBoardingModal;
