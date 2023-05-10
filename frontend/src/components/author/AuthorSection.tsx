import React from 'react';
import User from "@/data/models/User";
import {Stack, Typography} from "@mui/material";
import UserAvatar from "@/components/Avatar";
import Dot from "@/components/Dot";
import {useRouter} from "next/router";
import Route, {getUserRoute} from "@/utils/Routes";

interface AuthorSectionProps {
    author: User,
    avatarSize?: 'small' | 'medium' | 'large',
    date: string,
    className?: string
}

const AuthorSection = (
    {author: {profilePicUrl, username}, avatarSize = 'medium', date, className}: AuthorSectionProps
) => {
    const router = useRouter()
    const onClick = (e: any) => {
        e.stopPropagation()
        router.push(username ? getUserRoute(username) : Route.Home)
    }

    return (
        <Stack alignItems="center" direction="row" spacing={1} sx={{cursor: 'default'}}>
            <UserAvatar url={profilePicUrl} size={avatarSize} onClick={onClick}/>
            <Typography variant="caption" color="text.secondary" onClick={onClick}>{username}</Typography>
            <Dot/>
            <Typography variant="caption" color="text.secondary">{date}</Typography>
        </Stack>
    )
}

export default AuthorSection;
