import React, {useEffect, useState} from 'react';
import User from "@/data/models/User";
import PrimaryModal from "@/components/modals/PrimaryModal";
import {Alert, Box, Collapse, Stack} from "@mui/material";
import {usernameSchema} from "@/utils/Validation";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import styles from "./UpdateProfile.module.css"
import Image from "next/image";
import profilePlaceholder from "@/assets/images/profile-pic-placeholder.png"
import PrimaryButton from "@/components/styled/PrimaryButton";
import FormTextField from "@/components/form/FormTextField";
import FormImagePicker from "@/components/form/FormImagePicker";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import * as userDataSource from "@/data/dataSources/UserDataSource"
import {UpdateUserRequest} from "@/data/dataSources/UserDataSource"
import useFormImage from "@/hooks/useFormImage";
import useTracker from "@/hooks/useTracker";

interface UpdateProfileModalProps {
    user: User
    onDismiss: () => void
    onUpdated: (user: User) => void
    className?: string
}

const updateProfileSchema = yup.object({
    username: usernameSchema.required(),
    displayName: yup.string().max(20),
    about: yup.string().max(200),
    profilePic: yup.mixed<File>().nullable()
})

type UpdateProfileValues = yup.InferType<typeof updateProfileSchema>

const UpdateProfileModal = ({user, onDismiss, onUpdated, className}: UpdateProfileModalProps) => {

    const {mutateUser} = useAuthenticatedUser()

    const {control, handleSubmit, watch, formState: {isSubmitting}} = useForm<UpdateProfileValues>({
        defaultValues: {
            username: user.username,
            displayName: user.displayName,
            about: user.about,
        },
        resolver: yupResolver(updateProfileSchema)
    })

    const {fileUrl: userProfilePic} = useFormImage('profilePic', watch, user.profilePicUrl)
    const [error, setError] = useState<string | null>(null)
    const {editProfileModalOpen, editProfile} = useTracker()


    const onSubmit = async ({username, displayName, about, profilePic}: UpdateProfileValues) => {
        try {
            const response = await userDataSource.updateUserProfile({
                ...(username !== user.username && {username}),
                ...(displayName !== user.displayName && {displayName}),
                ...(about !== user.about && {about}),
                ...(userProfilePic !== user.profilePicUrl && {profilePic})
            } as UpdateUserRequest)
            await mutateUser(response)
            onUpdated(response)
            editProfile()
            onDismiss()
        } catch (e) {
            console.error(e)
            if (e instanceof Error)
                setError(e.message)
        }
    }

    useEffect(() => {
        editProfileModalOpen()
    }, [])

    return (
        <PrimaryModal open={true} onDismiss={onDismiss} lgSize="50%" padding={{xs: 2, md: 4, lg: 6}}>
            <Collapse in={!!error} sx={{marginBottom: "1rem"}}>
                <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
            </Collapse>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    direction={{xs: "column", md: "row"}}
                    spacing={4}
                    alignItems={{xs: "center", md: "start"}}>

                    <Box className={styles.avatarContainer}>
                        <Image
                            src={userProfilePic ?? profilePlaceholder}
                            alt="Profile Pic"
                            fill
                            priority
                            className={styles.avatar}/>
                    </Box>

                    <Stack flex={1} alignItems="stretch" spacing={2}>
                        <FormTextField
                            control={control}
                            name="username"
                            label="Username"
                            placeholder="Your username here"
                        />

                        <FormTextField
                            control={control}
                            name="displayName"
                            label="Display Name"
                            placeholder="Your display name here"
                        />

                        <FormTextField
                            control={control}
                            name="about"
                            label="About"
                            placeholder="Something about yourself...."
                            maxRows={4}
                            multiline
                            maxLength={200}
                        />

                        <FormImagePicker control={control} name="profilePic" label="Profile Picture"/>

                        <PrimaryButton type="submit" variant="contained" disabled={isSubmitting} fullWidth>Update
                            Profile</PrimaryButton>

                    </Stack>

                </Stack>

            </form>

        </PrimaryModal>
    )
}

export default UpdateProfileModal;
