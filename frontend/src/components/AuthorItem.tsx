import React from 'react';
import User from "@/data/models/User";
import {Box, Skeleton, Stack, Typography} from "@mui/material";
import UserAvatar from "@/components/Avatar";
import MultilineText from "@/components/styled/MultilineText";
import Link from "next/link";
import Route, {getUserRoute} from "@/utils/Routes";

interface AuthorItemProps {
    author: User
    className?: string
}

const AuthorItem = ({author, className}: AuthorItemProps) => {
    return (
        <Stack
            direction='row'
            alignItems='flex-start'
            justifyContent='stretch'
            spacing={2}
            className={className}
            component={Link}
            href={author.username ? getUserRoute(author.username) : Route.Home}
        >
            <Box flex={1}>
                <Typography variant='overline' color='text.primary'>{`@${author.username}`}</Typography>
                {author.displayName && <Typography variant='body1' fontWeight='bold'
                                                   color='text.primary'>{author.displayName}</Typography>}
                {author.about &&
                    <MultilineText maxLines={2} variant='caption' color='text.secondary'>{author.about}</MultilineText>}
            </Box>
            <UserAvatar variant='rounded' url={author.profilePicUrl} size='large'/>
        </Stack>
    )
}

export const AuthorItemSkeleton = () => {
    return (
        <Stack direction='row' alignItems='flex-start' justifyContent='stretch' spacing={2}>
            <Box flex={1}>
                <Skeleton variant='rectangular' height='1rem' sx={{marginBottom: 0.5}}/>
                <Skeleton variant='rectangular' height='1rem' sx={{marginBottom: 1}}/>
                <Skeleton variant='rectangular' height='2rem'/>
            </Box>
            <Skeleton variant='rectangular' height={48} width={48}/>
        </Stack>
    )
}

export default AuthorItem;
