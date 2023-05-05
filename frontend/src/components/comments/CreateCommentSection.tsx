import React, {useContext} from 'react';
import * as yup from 'yup'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormTextField from "@/components/form/FormTextField";
import {IconButton, Stack} from "@mui/material";
import {HttpError} from "@/data/HttpErrors";
import {createComment} from "@/data/dataSources/CommentDataSource";
import Comment from "@/data/models/Comment";
import {SendRounded} from "@mui/icons-material";
import {AuthModalsContext} from "@/components/modals/auth/AuthModal";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";

interface CreateCommentSectionProps {
    blogId:string
    className?: string,
    onCommentCreated:(comment:Comment) => void
}

const createCommentSchema = yup.object({
    comment: yup.string().max(300, "Comment cannot be longer than 300 characters")
})

type CreateCommentValues = yup.InferType<typeof createCommentSchema>

const CreateCommentSection = ({blogId, onCommentCreated, className}: CreateCommentSectionProps) => {
    const {showLogin} = useContext(AuthModalsContext)
    const {user} = useAuthenticatedUser()

    const {control, handleSubmit, reset} = useForm<CreateCommentValues>({
        resolver: yupResolver(createCommentSchema)
    })

    const onSubmit = async({comment}:CreateCommentValues) => {
        if(!comment) return
        if(!user) return showLogin()
        try{
            const response = await createComment(blogId, {comment})
            onCommentCreated(response)
            reset()
        } catch(e){
            console.error(e)
            if(e instanceof HttpError) alert(e.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction='row' spacing={1}>
                <FormTextField
                    fullWidth={false}
                    control={control}
                    name='comment'
                    maxLength={300}
                    showLength
                    maxRows={4}
                    placeholder='Enter your comment here'
                    InputProps={{
                        endAdornment: (
                            <IconButton size='small' type='submit'><SendRounded/></IconButton>
                        )
                    }}
                />
            </Stack>
        </form>
    )
}

export default CreateCommentSection;
