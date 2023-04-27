import React from 'react';
import {Stack, StackProps} from "@mui/material";
import {GoogleButton, GithubButton} from "@/components/auth/SocialButtons";

interface SocialAuthSectionProps {

    className?: string
}

const SocialAuthSection = ({className, ...props}: SocialAuthSectionProps & StackProps) => {
    return (
        <Stack direction="column" spacing={1} className={className} {...props}>
            <GoogleButton />
            <GithubButton />
        </Stack>
    )
}

export default SocialAuthSection;
