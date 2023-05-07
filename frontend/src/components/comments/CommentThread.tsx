import React, {useMemo, useState} from 'react';
import Comment from "@/data/models/Comment";
import {HttpError} from "@/data/HttpErrors";
import * as dataSource from "@/data/dataSources/CommentDataSource";
import useApiCall from "@/hooks/useApiCall";
import {Button, Stack, StackProps} from "@mui/material";
import CommentItem from "@/components/comments/CommentItem";
import CommentSkeleton from "@/components/comments/CommentSkeleton";

interface CommentThreadProps {
    comment: Comment,
    onCommentUpdated: (comment: Comment) => void,
    onCommentDeleted: (comment: Comment) => void,
    className?: string
}

const CommentThread = ({comment, onCommentUpdated, onCommentDeleted, className}: CommentThreadProps) => {
    const {data: remoteReplies, setData: setRemoteReplies, loading, error, ...api} = useApiCall<Comment[]>([])
    const [endOfPaginationReached, setEndOfPaginationReached] = useState<boolean>();

    const [localReplies, setLocalReplies] = useState<Comment[]>([]);

    const loadReplies = async () => {
        try {
            api.onStart()
            setLocalReplies([])
            const lastCommentId = remoteReplies[remoteReplies.length - 1]?._id
            const response = await dataSource.getCommentReplies(comment._id, lastCommentId);
            if (lastCommentId) setRemoteReplies([...remoteReplies, ...response.comments])
            else setRemoteReplies(response.comments)
            setEndOfPaginationReached(response.endOfPaginationReached)
        } catch (e) {
            api.onFail((e instanceof HttpError) ? e : undefined)
        } finally {
            api.onComplete()
        }
    }

    const onReplyCreated = (reply: Comment) => {
        setLocalReplies(prevReplies => [...prevReplies, reply])
    }

    const onRemoteReplyUpdated = (updatedReply: Comment) => {
        setRemoteReplies(replies =>
            replies.map(reply => reply._id === updatedReply._id ? updatedReply : reply)
        )
    }

    const onRemoteReplyDeleted = (deletedReply: Comment) => {
        setRemoteReplies(replies =>
            replies.filter(reply => reply._id !== deletedReply._id)
        )
    }

    const onLocalReplyUpdated = (updatedReply: Comment) => {
        setLocalReplies(replies =>
            replies.map(reply => reply._id === updatedReply._id ? updatedReply : reply)
        )
    }

    const onLocalReplyDeleted = (deletedReply: Comment) => {
        setLocalReplies(replies =>
            replies.filter(reply => reply._id !== deletedReply._id)
        )
    }

    const showRepliesList = loading !== undefined
    const hasLocalReplies = !!localReplies.length
    const showRepliesButton = !!comment.repliesCount && !loading && !endOfPaginationReached
    const buttonText = endOfPaginationReached === undefined
        ? comment.repliesCount === 1 ? '1 reply' : `${comment.repliesCount} replies`
        : 'Load more replies'

    const skeletons = useMemo(() => (
        Array(3).fill(0).map((_, i) => <CommentSkeleton key={i}/>)
    ), []);

    return (
        <Stack className={className} spacing={2}>
            <CommentItem
                comment={comment}
                onCommentUpdated={onCommentUpdated}
                onReplyCreated={onReplyCreated}
                onCommentDeleted={onCommentDeleted}
            />
            {showRepliesList && <Replies
                replies={remoteReplies}
                onReplyCreated={onReplyCreated}
                onReplyUpdated={onRemoteReplyUpdated}
                onReplyDeleted={onRemoteReplyDeleted}
            />}
            {loading && <Stack paddingLeft={6} spacing={2}>{skeletons}</Stack>}
            {showRepliesButton &&
                <Button variant='text' onClick={loadReplies} sx={{paddingX: 2, alignSelf: 'start'}}>
                    {buttonText}
                </Button>
            }
            {hasLocalReplies && <Replies
                replies={localReplies}
                onReplyCreated={onReplyCreated}
                onReplyUpdated={onLocalReplyUpdated}
                onReplyDeleted={onLocalReplyDeleted}
            />}
        </Stack>
    )
}

interface RepliesProps {
    replies: Comment[],
    onReplyCreated: (reply: Comment) => void,
    onReplyUpdated: (reply: Comment) => void,
    onReplyDeleted: (reply: Comment) => void,
}

const Replies = ({replies, onReplyCreated, onReplyUpdated, onReplyDeleted, ...props}: RepliesProps & StackProps) => {

    return (
        <Stack paddingLeft={6} spacing={2} {...props}>
            {replies.map(reply => (
                <CommentItem
                    key={reply._id}
                    comment={reply}
                    onCommentUpdated={onReplyUpdated}
                    onReplyCreated={onReplyCreated}
                    onCommentDeleted={onReplyDeleted}
                />
            ))}
        </Stack>
    )
}

export default CommentThread;
