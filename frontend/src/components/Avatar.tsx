import React from 'react';
import {Avatar, AvatarProps} from "@mui/material";

interface UserAvatarProps {
    url?: string
    username?: string

    size?: "small" | "medium" | "large" | "100"
    className?: string
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1)
        hash = string.charCodeAt(i) + ((hash << 5) - hash);

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

const UserAvatar = ({url, username, size = "medium", className, ...avatarProps}: UserAvatarProps & AvatarProps) => {

    const avatarSize = size === "small" ? 16 : size === "medium" ? 24 : size === "large" ? 48 : "100%";
    const props = {
        className: className,
        sx: {
            width: avatarSize,
            height: avatarSize,
            variant: "circular",
            ...((!url && username) && {backgroundColor: stringToColor(username)})
        }
    }

    if (url)
        return <Avatar {...props} src={url} {...avatarProps}/>;
    else if (username)
        return <Avatar {...props} {...avatarProps}>{username[0]}</Avatar>;
    else
        return <Avatar {...props} {...avatarProps}/>

}

export default UserAvatar;
