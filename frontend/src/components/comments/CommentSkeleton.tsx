import {Skeleton, Stack} from "@mui/material";
import React from "react";

const CommentSkeleton = () => {
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

export default CommentSkeleton