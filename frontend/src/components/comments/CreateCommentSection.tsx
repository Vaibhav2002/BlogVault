import React, {useContext, useEffect} from 'react';
import * as yup from 'yup'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormTextField from "@/components/form/FormTextField";
import {IconButton, Stack} from "@mui/material";
import {HttpError} from "@/data/HttpErrors";
import {createComment} from "@/data/dataSources/CommentDataSource";
import Comment from "@/data/models/Comment";
import {AuthModalsContext} from "@/components/modals/auth/AuthModal";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import {MdClose, MdSend} from "react-icons/md";

interface CreateCommentSectionProps {
    blogId: string
    title?: string
    parentCommentId?: string
    defaultValue?: string
    placeholder?: string
    canClose?: boolean,
    onClose?: () => void,
    className?: string,
    onCommentCreated: (comment: Comment) => void
}

const createCommentSchema = yup.object({
    comment: yup.string().max(300, "Comment cannot be longer than 300 characters")
})

type CreateCommentValues = yup.InferType<typeof createCommentSchema>

const CreateCommentSection = (
    {blogId, title, parentCommentId, defaultValue, onCommentCreated, className, ...props}: CreateCommentSectionProps
) => {
    const {showLogin} = useContext(AuthModalsContext)
    const {user} = useAuthenticatedUser()

    const {control, handleSubmit, reset, setFocus} = useForm<CreateCommentValues>({
        resolver: yupResolver(createCommentSchema),
        defaultValues: {comment: defaultValue || ''}
    })

    const onSubmit = async ({comment}: CreateCommentValues) => {
        if (!comment) return
        if (!user) return showLogin()
        try {
            const response = await createComment(blogId, {comment, parentCommentId})
            onCommentCreated(response)
            reset()
        } catch (e) {
            console.error(e)
            if (e instanceof HttpError) alert(e.message)
        }
    }

    useEffect(() => {
        if (parentCommentId) setFocus('comment')
    }, [setFocus])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction='row' spacing={1}>
                <FormTextField
                    fullWidth={false}
                    control={control}
                    name='comment'
                    maxLength={300}
                    showLength
                    label={title}
                    maxRows={4}
                    placeholder={props.placeholder || 'Enter your comment here'}
                    InputProps={{
                        endAdornment: (
                            <>
                                <IconButton size='small' type='submit'><MdSend/></IconButton>
                                {props.canClose &&
                                    <IconButton size='small' onClick={props.onClose}><MdClose/></IconButton>}
                            </>
                        )
                    }}
                />
            </Stack>
        </form>
    )
}

export default CreateCommentSection;
