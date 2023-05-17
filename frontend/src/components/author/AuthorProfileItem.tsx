import React from 'react';
import User from "@/data/models/User";
import {Box, BoxProps, Typography} from "@mui/material";
import UserAvatar from "@/components/Avatar";
import BottomGradientBox from "@/components/styled/BottomGradientBox";
import MultilineText from "@/components/styled/MultilineText";
import Routes, {getUserRoute} from "@/utils/Routes";
import {useRouter} from "next/router";

interface AuthorProfileItemProps {
    author: User
    className?: string
}

const AuthorProfileItem = (
    {author: {profilePicUrl, username, displayName}, className, ...props}: AuthorProfileItemProps & BoxProps
) => {
    const router = useRouter()
    const onClick = async () => {
        await router.push(username ? getUserRoute(username) : Routes.Home)
    }

    return (
        <Box onClick={onClick}
             sx={{position: 'relative', aspectRatio: '3/4', borderRadius: 2, overflow: 'hidden'}} {...props}>
            <UserAvatar size='100' variant='rounded' url={profilePicUrl}/>
            <BottomGradientBox color='white' padding={2}>
                <Typography variant='caption' paddingBottom={0}>{`@${username}`}</Typography>
                {displayName &&
                    <MultilineText maxLines={2} variant='body2' fontWeight='bold'>{displayName}</MultilineText>}
            </BottomGradientBox>
        </Box>
    )
}

export default AuthorProfileItem;
