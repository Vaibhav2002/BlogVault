import React, {useState} from 'react';
import {Divider, Stack, Theme, ToggleButton, Typography, useMediaQuery} from "@mui/material";
import UserAvatar from "@/components/Avatar";
import {formatDate} from "@/utils/Helpers";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {useRouter} from "next/router";
import {getEditBlogRoute, getUserRoute} from "@/utils/Routes";
import Link from "next/link";
import Blog from "@/data/models/Blog";
import {HttpError} from "@/data/HttpErrors";
import * as dataSource from "@/data/dataSources/SavedBlogDataSource";

interface BlogAuthorSectionProps {
    blog: Blog
    className?: string
}

const BlogAuthorSection = ({blog: {author, slug, isSaved}, className}: BlogAuthorSectionProps) => {

    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
    const {user} = useAuthenticatedUser()
    const isAuthenticatedUserAuthor = author._id === user?._id
    const [blogSaved, setBlogSaved] = useState(!!isSaved)

    const router = useRouter()

    const onUpdatePress = async () => {
        await router.push(getEditBlogRoute(slug))
    }

    const onBlogSaveToggle = async () => {
        try {
            if (blogSaved)
                await dataSource.unSaveBlog(slug)
            else await dataSource.saveBlog(slug)
            setBlogSaved(!blogSaved)
        } catch (e) {
            console.error(e)
            if (e instanceof HttpError) alert(e.message)
        }
    }


    return (
        <Stack direction="column" gap={4} className={className}>
            <Divider/>

            <Stack
                direction={isBelowSm ? "column" : "row"}
                justifyContent="space-between"
                alignItems="center"
                gap={3}
            >

                <Stack alignItems="center" direction="row" component={Link} href={getUserRoute(author?.username ?? '')}>
                    <UserAvatar src={author.profilePicUrl} size="large"/>

                    <Stack flex="1" paddingX={2} gap={0}>
                        <Typography variant="body1" color="text.primary">{author.username}</Typography>
                        <Typography variant="caption" color="text.disabled">
                            {`User since ${formatDate(author.createdAt)}`}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction='row' spacing={1} justifyContent='center'>
                    {user &&
                        <ToggleButton
                            selected={blogSaved}
                            onClick={onBlogSaveToggle}
                            color='primary'
                            value='save'
                        >
                            {blogSaved ? 'Saved' : 'Save for later'}
                        </ToggleButton>
                    }

                    {isAuthenticatedUserAuthor &&
                        <PrimaryButton
                            variant="outlined"
                            color="secondary"
                            onClick={onUpdatePress}
                        >
                            Edit Blog
                        </PrimaryButton>
                    }
                </Stack>
            </Stack>

            <Divider/>
        </Stack>
    )
}

export default BlogAuthorSection;
