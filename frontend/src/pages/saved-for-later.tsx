import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import React, {useCallback, useContext, useState} from "react";
import {AuthModalsContext} from "@/components/modals/auth/AuthModal";
import * as savedDataSource from "@/data/dataSources/SavedBlogDataSource";
import useSWR from "swr";
import NavScreen from "@/components/NavScreen/NavScreen";
import {NavScreen as NavPage} from "@/components/navBars/NavOptions";
import {Stack, Typography} from "@mui/material";
import BlogList, {BlogSkeletonList} from "@/components/blogItem/BlogList";
import {useRouter} from "next/router";
import {getBlogRoute} from "@/utils/Routes";
import Blog from "@/data/models/Blog";
import PaginationBar from "@/components/PaginationBar";
import _ from "lodash";
import CenteredBox from "@/components/styled/CenteredBox";
import EmptyState from "@/components/EmptyState";
import Head from "next/head";

const SavedBlogsPage = () => {
    const {user} = useAuthenticatedUser()

    return (
        <NavScreen selected={NavPage.SavedBlogs}>
            {user
                ? <LoggedInView/>
                : <LoggedOutView/>
            }
        </NavScreen>
    )
}

const LoggedOutView = () => {
    const {showLogin} = useContext(AuthModalsContext)
    return (
        <CenteredBox height='100%'>
            <EmptyState
                title='Login to see your Saved Blogs'
                message='You need to be logged in to see your saved blogs'
                ctaText='Login'
                onCtaClick={showLogin}
            />
        </CenteredBox>
    )
}

const LoggedInView = () => {
    const router = useRouter()

    const [page, setPage] = useState(1)

    const {data: blogPage, isLoading, error, mutate} = useSWR(
        [page, 'savedBlogs'],
        ([page]) => savedDataSource.getSavedBlogs(page)
    )

    const onBlogClick = (blog: Blog) => router.push(getBlogRoute(blog.slug))
    const onBlogUnSaved = (blog: Blog) => mutate()


    const emptyState = useCallback(() => (
        <EmptyState
            title='You have not saved any blogs yet'
            message='Press the Save for Later button on a blog to save it'
        />
    ), [])

    return (
        <>
            <Head>
                <title>Saved - BlogVault</title>
                <meta name='description'
                      content='Save blogs for later and never miss out on great reads. Curate a personalized reading list to enjoy captivating content at your convenience. Enhance your reading experience and make the most of your valuable time.'/>
            </Head>
            <CenteredBox>
                <Stack
                    spacing={3}
                    paddingY={4}
                    width={{xs: '90%', md: '80%', lg: '70%', xl: '60%'}}
                    style={{justifySelf: 'start'}}
                >
                    {isLoading && <BlogSkeletonList count={5}/>}
                    {blogPage && !_.isEmpty(blogPage.blogs) &&
                        <>
                            <Typography variant="h4">Saved Blogs</Typography>
                            <BlogList blogs={blogPage.blogs} onBlogClick={onBlogClick}
                                      onBlogUnSaved={onBlogUnSaved}/>
                            <PaginationBar
                                page={page}
                                count={blogPage.totalPages}
                                onPageChange={setPage}
                                sx={{alignSelf: 'center'}}
                            />
                        </>
                    }

                    {blogPage && _.isEmpty(blogPage.blogs) && emptyState()}
                </Stack>
            </CenteredBox>
        </>

    )
}

export default SavedBlogsPage;