import React, {useContext, useMemo, useState} from 'react';
import Comment from "@/data/models/Comment";
import {Box, Button, Stack, Typography} from "@mui/material";
import AuthorSection from "@/components/AuthorSection";
import {formatRelativeDate} from "@/utils/Helpers";
import Dot from "@/components/Dot";
import MultilineText from "@/components/styled/MultilineText";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import EditCommentSection from "@/components/comments/EditCommentSection";
import Link from "@mui/material/Link";
import CreateCommentSection from "@/components/comments/CreateCommentSection";
import {AuthModalsContext} from "@/components/modals/auth/AuthModal";
import {NotFoundError} from "@/data/HttpErrors";
import * as dataSource from "@/data/dataSources/CommentDataSource";

interface CommentProps {
    comment: Comment,
    onCommentUpdated: (comment: Comment) => void,
    onReplyCreated: (comment: Comment) => void,
    onCommentDeleted: (comment: Comment) => void
    className?: string
}

const CommentItem = ({comment, onCommentUpdated, onCommentDeleted, onReplyCreated, className}: CommentProps) => {
    const {user} = useAuthenticatedUser()
    const {showLogin} = useContext(AuthModalsContext)
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleCommentUpdated = (updatedComment: Comment) => {
        onCommentUpdated(updatedComment)
        setShowEdit(false)
    }

    const handleReplyClicked = () => {
        if (!user) showLogin()
        else setShowReplyBox(true)
    }

    const handleEditClicked = () => {
        setShowEdit(true)
        setShowReplyBox(false)
    }

    const handleDeleteClicked = () => {
        setShowReplyBox(false)
        setShowDeleteConfirmation(true)
    }

    const handleCommentDeleted = () => {
        setShowDeleteConfirmation(false)
        onCommentDeleted(comment)
    }

    const handleReplyCreated = (comment: Comment) => {
        setShowReplyBox(false)
        onReplyCreated(comment)
    }

    return (
        <Box>
            {showEdit
                ? <EditCommentSection
                    comment={comment}
                    onCommentUpdated={handleCommentUpdated}
                    onCancel={() => setShowEdit(false)}/>
                : (
                    <Stack sx={{backgroundColor: 'background.light', borderRadius: '8px'}} padding={2} spacing={1}>
                        <CommentLayout
                            comment={comment}
                            onEditClicked={handleEditClicked}
                            onReplyClicked={handleReplyClicked}
                            onDeleteClicked={handleDeleteClicked}
                        />
                        {showReplyBox && <CreateCommentSection
                            blogId={comment.blogId}
                            onCommentCreated={handleReplyCreated}
                            parentCommentId={comment._id}
                            placeholder='Write a reply...'
                            canClose
                            defaultValue={comment.parentCommentId ? `@${comment.author.username} ` : ''}
                            onClose={() => setShowReplyBox(false)}
                        />}
                        {showDeleteConfirmation && <CommentDelete
                            comment={comment}
                            onDeleted={handleCommentDeleted}
                            onCancel={() => setShowDeleteConfirmation(false)}/>
                        }

                    </Stack>
                )

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
        <Box>
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

interface CommentDeleteProps {
    comment: Comment,
    onDeleted: () => void
    onCancel: () => void
}

const CommentDelete = ({comment, onDeleted, onCancel}: CommentDeleteProps) => {

    const deleteComment = async () => {
        try {
            await dataSource.deleteComment(comment._id)
            onDeleted()
        } catch (e) {
            if (e instanceof NotFoundError) onDeleted()
            else if (e instanceof Error) alert(e.message)
            console.error(e)
        }
    }

    return (
        <Stack direction='row' spacing={1} padding={1} justifyContent='end'>
            <Button variant='outlined' color='error' onClick={deleteComment}>Delete</Button>
            <Button variant='outlined' onClick={onCancel}>Cancel</Button>
        </Stack>
    )
}


export default CommentItem;
