import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Comment from "@/data/models/Comment";
import {Alert, Box, Button, Collapse, Stack, Typography} from "@mui/material";
import * as dataSource from '@/data/dataSources/CommentDataSource'
import {HttpError} from "@/data/HttpErrors";
import CommentItem, {CommentSkeleton} from "@/components/comments/CommentItem";

interface CommentSectionProps {
    blogId: string
    className?: string
}

const CommentSection = ({blogId, className}: CommentSectionProps) => {

    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [endOfPaginationReached, setEndOfPaginationReached] = useState<boolean>();

    const skeletons = useMemo(() => (
        Array(3).fill(0).map((_, i) => <CommentSkeleton key={i}/>)
    ), []);

    const commentsAvailable = !loading && comments.length > 0

    const paginate = () => useCallback(() =>
        loadComments(comments[comments.length - 1]?._id), [comments]
    )

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

    return (
        <Stack spacing={2}>
            <Typography variant='h5'>Comments</Typography>
            <Collapse in={!!error}>
                <Alert severity='error'>{error}</Alert>
            </Collapse>
            <Stack spacing={loading ? 4 : 2}>
                {loading && skeletons}
                {commentsAvailable && comments.map(comment => <CommentItem comment={comment}/>)}
                {commentsAvailable && endOfPaginationReached === false &&
                    <Button variant='text' onClick={paginate}>Load More</Button>
                }
            </Stack>
        </Stack>
    )
}

export default CommentSection;
