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

    return (
        <Stack alignItems="center" direction="row" spacing={1}>
            <UserAvatar url={profilePicUrl}/>
            <Typography variant="caption" color="text.secondary">{username}</Typography>
            <Dot/>
            <Typography variant="caption" color="text.secondary">{date}</Typography>
        </Stack>
    )
}

export default AuthorSection;
