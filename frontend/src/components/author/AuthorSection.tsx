import React from 'react';
import User from "@/data/models/User";
import {Stack, Typography} from "@mui/material";
import UserAvatar from "@/components/Avatar";
import Dot from "@/components/Dot";
import {useRouter} from "next/router";
import Route, {getUserRoute} from "@/utils/Routes";
import useTracker from "@/hooks/useTracker";
import Blog from "@/data/models/Blog";

interface AuthorSectionProps {
    blog?: Blog,
    author: User,
    avatarSize?: 'small' | 'medium' | 'large',
    date: string,
    views?: number,
    className?: string
}

const AuthorSection = (
    {blog, author, avatarSize = 'medium', views, date, className}: AuthorSectionProps
) => {
    const {profilePicUrl, username} = author
    const router = useRouter()
    const {blogAuthorAvatarClick} = useTracker()

    const onClick = (e: any) => {
        e.stopPropagation()
        if (blog) blogAuthorAvatarClick(blog)
        router.push(username ? getUserRoute(username) : Route.Home)
    }

    return (
        <Stack alignItems="center" direction="row" spacing={1} sx={{cursor: 'default'}}>
            <UserAvatar url={profilePicUrl} size={avatarSize} onClick={onClick}/>
            <Typography variant="caption" color="text.secondary" onClick={onClick} sx={{cursor: 'pointer'}}>
                {username}
            </Typography>
            <Dot/>
            <Typography variant="caption" color="text.secondary">{date}</Typography>
            {views && (views > 0) &&
                <>
                    <Dot/>
                    <Typography variant="caption" color="text.secondary">{`${views} views`}</Typography>
                </>
            }
        </Stack>
    )
}

export default AuthorSection;
