import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Comment from "@/data/models/Comment";
import {Alert, Button, Collapse, Stack, Typography} from "@mui/material";
import * as dataSource from '@/data/dataSources/CommentDataSource'
import {HttpError} from "@/data/HttpErrors";
import CommentItem from "@/components/comments/CommentItem";
import CommentSkeleton from "@/components/comments/CommentSkeleton";
import CreateCommentSection from "@/components/comments/CreateCommentSection";

interface CommentSectionProps {
    blogId: string
    className?: string
}

const BlogCommentSection = (props: CommentSectionProps) => {
    return <CommentSection {...props} key={props.blogId}/>
}

const CommentSection = ({blogId, className}: CommentSectionProps) => {

    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [endOfPaginationReached, setEndOfPaginationReached] = useState<boolean>();

    const skeletons = useMemo(() => (
        Array(3).fill(0).map((_, i) => <CommentSkeleton key={i}/>)
    ), []);

    const commentsAvailable= comments.length > 0

    const paginate = () => loadComments(comments[comments.length - 1]?._id)

    const loadComments = useCallback(async function (lastCommentId?: string)  {
        setError(null)
        setLoading(true)
        try {
            const response = await dataSource.getAllComments(blogId, lastCommentId);
            if(lastCommentId)
                setComments(prevComments => [...prevComments, ...response.comments])
            else setComments(response.comments)
            setEndOfPaginationReached(response.endOfPaginationReached)
        } catch (e) {
            console.error(e)
            if (e instanceof HttpError) setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [blogId])

    useEffect(() => {
        loadComments()
    }, [loadComments])

    const onCommentCreated = (comment: Comment) => (
        setComments(prevComments => [comment, ...prevComments])
    )

    const onCommentUpdated = useCallback((comment: Comment) => {
        setComments(prevComments => prevComments.map(prevComment => {
            if (prevComment._id === comment._id) return comment
            return prevComment
        }))
    }, [])

    const onReplyCreated = () => {
    }

    const onCommentDeleted = useCallback((comment: Comment) => {
        setComments(prevComments => prevComments.filter(prevComment => prevComment._id !== comment._id))
    }, [])

    return (
        <Stack spacing={1}>
            <Typography variant='h5'>Comments</Typography>

            <Collapse in={!!error}>
                <Alert severity='error'>{error}</Alert>
            </Collapse>

            <CreateCommentSection blogId={blogId} onCommentCreated={onCommentCreated}/>

            <Stack spacing={loading ? 4 : 2} marginTop={2}>
                {commentsAvailable && comments.map(comment => (
                    <CommentItem
                        comment={comment}
                        onCommentUpdated={onCommentUpdated}
                        onReplyCreated={onReplyCreated}
                        onCommentDeleted={onCommentDeleted}
                    />
                ))}
                {loading && skeletons}
                {commentsAvailable && endOfPaginationReached === false &&
                    <Button variant='text' onClick={paginate}>Load More</Button>
                }
                {!commentsAvailable && endOfPaginationReached &&
                    <Typography variant='body2'>No comments yet</Typography>
                }
            </Stack>
        </Stack>
    )
}

export default BlogCommentSection;
