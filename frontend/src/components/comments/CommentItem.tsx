import React, {useMemo, useState} from 'react';
import Comment from "@/data/models/Comment";
import {Box, Skeleton, Stack, Typography} from "@mui/material";
import AuthorSection from "@/components/AuthorSection";
import {formatRelativeDate} from "@/utils/Helpers";
import Dot from "@/components/Dot";
import MultilineText from "@/components/styled/MultilineText";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import EditCommentSection from "@/components/comments/EditCommentSection";
import Link from "@mui/material/Link";

interface CommentProps {
    comment: Comment,
    onCommentUpdated: (comment: Comment) => void,
    className?: string
}

const CommentItem = ({comment, onCommentUpdated, className}: CommentProps) => {
    const [showEdit, setShowEdit] = useState<boolean>(false)

    const handleCommentUpdated = (updatedComment: Comment) => {
        onCommentUpdated(updatedComment)
        setShowEdit(false)
    }

    const handleReplyClicked = () => {

    }

    const handleEditClicked = () => {
        setShowEdit(true)
    }

    const handleDeleteClicked = () => {
    }

    const onCancel = () => {
        setShowEdit(false)
    }

    return (
        <Box>
            {showEdit
                ? <EditCommentSection comment={comment} onCommentUpdated={handleCommentUpdated} onCancel={onCancel}/>
                : <CommentLayout comment={comment} onEditClicked={handleEditClicked} onReplyClicked={handleReplyClicked}
                                 onDeleteClicked={handleDeleteClicked}/>
            }
        </Box>
    )

}

interface CommentLayoutProps {
    comment: Comment,
    onEditClicked: () => void,
    onReplyClicked: () => void,
    onDeleteClicked: () => void,
    className?: string
}

const CommentLayout = ({comment, onEditClicked, onReplyClicked, onDeleteClicked, className}: CommentLayoutProps) => {
    const isUpdated = comment.updatedAt > comment.createdAt
    const editedText = useMemo(() => (
        <>
            <Dot/>
            <Typography variant="caption" color="text.secondary">Edited</Typography>
        </>
    ), [])

    return (
        <Box sx={{backgroundColor: 'background.light', borderRadius: '8px'}} width={1} padding={2}>
            <Stack direction='row' overflow="hidden" spacing={1} alignItems='center'>
                <AuthorSection author={comment.author} date={formatRelativeDate(comment.createdAt)}/>
                {isUpdated && editedText}
            </Stack>
            <Stack marginLeft='32px' spacing={1}>
                <MultilineText maxLines={6} variant="body1">
                    {comment.comment}
                </MultilineText>
                <CommentActions
                    authorId={comment.author._id}
                    onReplyClicked={onReplyClicked}
                    onEditClicked={onEditClicked}
                    onDeleteClicked={onDeleteClicked}
                />
            </Stack>
        </Box>
    )
}

interface CommentActionsProps {
    authorId: string,
    onReplyClicked: () => void
    onEditClicked: () => void
    onDeleteClicked: () => void
}

const CommentActions = ({authorId, onReplyClicked, onEditClicked, onDeleteClicked}: CommentActionsProps) => {
    const {user} = useAuthenticatedUser()
    const isUserTheAuthor = user?._id === authorId

    const action = (text: string, onClick: () => void) => (
        <Link underline='hover' variant='caption' color='text.secondary' onClick={onClick} sx={{cursor: 'pointer'}}>
            {text}
        </Link>
    )

    return (
        <Stack direction='row' spacing={1} alignItems='center'>
            {action('Reply', onReplyClicked)}
            {isUserTheAuthor &&
                <>
                    <Dot/>
                    {action('Edit', onEditClicked)}
                    <Dot/>
                    {action('Delete', onDeleteClicked)}
                </>
            }

        </Stack>
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
