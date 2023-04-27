import React from 'react';
import User from "@/data/models/User";
import {Divider, Stack, Theme, Typography, useMediaQuery} from "@mui/material";
import UserAvatar from "@/components/Avatar";
import {formatDate} from "@/utils/Helpers";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {useRouter} from "next/router";
import {getEditBlogRoute, getUserRoute} from "@/utils/Routes";
import Link from "next/link";

interface BlogAuthorSectionProps {
    slug:string
    author: User
    className?: string
}

const BlogAuthorSection = ({slug, author, className}: BlogAuthorSectionProps) => {

    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
    const {user} = useAuthenticatedUser()
    const isAuthenticatedUserAuthor = author._id === user?._id

    const router = useRouter()

    const onUpdatePress = async () => {
        await router.push(getEditBlogRoute(slug))
    }


    return (
        <Stack direction="column" gap={4} className={className}>
            <Divider/>

            <Stack
                direction={isBelowSm ? "column" : "row"}
                justifyContent="space-between"
                alignItems="center"
                gap={2}
            >

                <Stack alignItems="center" direction="row" component={Link} href={getUserRoute(author.username)}>
                    <UserAvatar src={author.profilePicUrl} size="large"/>

                    <Stack flex="1" paddingX={2} gap={0}>
                        <Typography variant="body1" color="text.primary">{author.username}</Typography>
                        <Typography variant="caption" color="text.disabled">
                            {`User since ${formatDate(author.createdAt)}`}
                        </Typography>
                    </Stack>
                </Stack>

                {isAuthenticatedUserAuthor &&
                    <PrimaryButton variant="outlined" color="secondary" fullWidth={isBelowSm} sx={{paddingX: 4}} onClick={onUpdatePress}>
                        Edit Blog
                    </PrimaryButton>
                }

            </Stack>

            <Divider/>
        </Stack>
    )
}

export default BlogAuthorSection;
