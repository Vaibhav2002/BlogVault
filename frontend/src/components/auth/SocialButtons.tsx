import React from 'react';
import PrimaryButton from "@/components/styled/PrimaryButton";
import {FcGoogle} from "react-icons/fc";
import {BsGithub} from "react-icons/bs";
import {googleLoginUrl} from "@/data/dataSources/AuthDataSource";
import {useRouter} from "next/router";

interface GoogleButtonProps {
    className?: string
}

const GoogleButton = ({className}: GoogleButtonProps) => {
    const router = useRouter()
    return (
        <PrimaryButton
            fullWidth
            variant="outlined"
            startIcon={ <FcGoogle/> }
            className={className}
            href={googleLoginUrl(router.asPath)}
        >
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
