import React, {useMemo} from 'react';
import Comment from "@/data/models/Comment";
import {Box, Skeleton, Stack, Typography} from "@mui/material";
import AuthorSection from "@/components/AuthorSection";
import {formatRelativeDate} from "@/utils/Helpers";
import Dot from "@/components/Dot";
import MultilineText from "@/components/styled/MultilineText";

interface CommentProps {
    comment: Comment
    className?: string
}

const CommentItem = ({comment, className}: CommentProps) => {
    const isUpdated = comment.updatedAt > comment.createdAt
    const editedText = useMemo(() => (
        <>
            <Dot/>
            <Typography variant="caption" color="text.secondary">Edited</Typography>
        </>
    ), [])

    return (
        <Box sx={{backgroundColor:'background.light', borderRadius:'8px'}} width={1} padding={2}>
            <Stack direction='row' overflow="hidden" spacing={1}>
                <AuthorSection author={comment.author} date={formatRelativeDate(comment.createdAt)}/>
                {isUpdated && editedText}
            </Stack>
            <MultilineText maxLines={6} variant="body1" marginLeft='32px'>
                {comment.comment}
            </MultilineText>
        </Box>
    )
}

export const CommentSkeleton = () => {
    return (
        <Stack direction='row' alignItems='start' width={1} spacing={1}>
            <Skeleton variant='circular' width={40} height={40} animation='wave'/>
            <Stack flex={1} alignItems='stretch' spacing={1}>
                <Skeleton variant='rectangular' height={40} animation='wave'/>
                <Skeleton variant='rectangular' height={100} animation='wave'/>
            </Stack>
        </Stack>
    )
}

export default CommentItem;
