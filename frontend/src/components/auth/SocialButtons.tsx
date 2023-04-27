import React from 'react';
import PrimaryButton from "@/components/styled/PrimaryButton";
import {FcGoogle} from "react-icons/fc";
import {BsGithub} from "react-icons/bs";

interface GoogleButtonProps {
    className?: string
}

const GoogleButton = ({className}: GoogleButtonProps) => {
    return (
        <PrimaryButton fullWidth variant="outlined" startIcon={ <FcGoogle/> } className={className}>
            Continue with Google
        </PrimaryButton>
    )
}


interface GithubButtonProps {
    className?: string
}

const GithubButton = ({className}: GithubButtonProps) => {
    return (
        <PrimaryButton fullWidth variant="outlined" startIcon={ <BsGithub/> } className={className}>
            Continue with GitHub
        </PrimaryButton>
    )
}

export {GoogleButton, GithubButton};
