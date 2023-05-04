import React from 'react';
import User from "@/data/models/User";
import {Box, Stack, Theme, Typography, useMediaQuery} from "@mui/material";
import UserAvatar from "@/components/Avatar";
import Dot from "@/components/Dot";

interface AuthorSectionProps {
    author: User,
    date: string,
    className?: string
}

const AuthorSection = ({author: {profilePicUrl, username}, date, className}: AuthorSectionProps) => {

    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))
    const avatarSize = isBelowSm ? "small" : "medium"

    return (
        <Stack alignItems="center" direction="row" spacing={1}>
            <UserAvatar size={avatarSize} url={profilePicUrl}/>
            <Typography variant="body2" color="text.secondary">{username}</Typography>
            <Dot/>
            <Typography variant="caption" color="text.secondary">{date}</Typography>
        </Stack>
    )
}

export default AuthorSection;
