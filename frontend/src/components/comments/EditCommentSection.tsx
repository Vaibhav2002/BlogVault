import React, {useEffect} from 'react';
import Comment from "@/data/models/Comment";
import {IconButton, Stack, Typography} from "@mui/material";
import FormTextField from "@/components/form/FormTextField";
import {MdClose, MdSend} from "react-icons/md";
import * as yup from 'yup'
import {commentSchema} from "@/utils/Validation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {HttpError} from "@/data/HttpErrors";
import {updateComment} from "@/data/dataSources/CommentDataSource";

interface EditCommentSectionProps {
    comment: Comment,
    onCommentUpdated: (comment: Comment) => void,
    onCancel: () => void,
    className?: string
}

const updateCommentSchema = yup.object({
    comment: commentSchema
})

type UpdateCommentValues = yup.InferType<typeof updateCommentSchema>

const EditCommentSection = ({comment, onCommentUpdated, onCancel, className}: EditCommentSectionProps) => {

    const {control, handleSubmit, setFocus, formState: {isSubmitting}} = useForm<UpdateCommentValues>({
        resolver: yupResolver(updateCommentSchema),
        defaultValues: {comment: comment.comment}
    })

    const onSubmit = async (value: UpdateCommentValues) => {
        if (!value.comment) return
        try {
            const response = await updateComment(comment._id, {comment: value.comment})
            onCommentUpdated(response)
        } catch (e) {
            console.error(e)
            if (e instanceof HttpError) alert(e.message)
        }
    }

    useEffect(() => setFocus('comment'), []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
                <Typography variant='subtitle2' color='text.secondary'>Update comment</Typography>
                <FormTextField
                    fullWidth={false}
                    control={control}
                    name='comment'
                    maxLength={300}
                    showLength
                    maxRows={4}
                    focused
                    placeholder='Enter your comment here'
                    InputProps={{
                        endAdornment: (
                            <>
                                <IconButton size='small' type='submit'
                                            disabled={isSubmitting}><MdSend/></IconButton>
                                <IconButton size='small' onClick={onCancel}><MdClose/></IconButton>
                            </>

                        )
                    }}
                />
            </Stack>
        </form>
    )
}

export default EditCommentSection;
