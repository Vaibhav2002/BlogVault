import React, {useCallback} from 'react';
import NavScreen from "@/components/NavScreen/NavScreen";
import {NavScreen as NavPage} from "@/components/navBars/NavOptions";
import {GetServerSideProps} from "next";
import {getTrendingAuthors, getTrendingBlogs} from "@/data/dataSources/BlogDataSource";
import {stringify} from "querystring";
import Routes, {getBlogRoute} from "@/utils/Routes";
import Blog, {BlogPage} from "@/data/models/Blog";
import _ from "lodash";
import EmptyState from "@/components/EmptyState";
import {Box, Stack, StackProps, Typography} from "@mui/material";
import User from "@/data/models/User";
import AuthorProfileItem from "@/components/author/AuthorProfileItem";
import {useRouter} from "next/router";
import BlogList from "@/components/blogItem/BlogList";
import PaginationBar from "@/components/PaginationBar";
import useSWR from "swr";
import {getTrendingTopics} from "@/data/dataSources/TopicDataSource";
import MultilineText from "@/components/styled/MultilineText";
import ChipGroup, {ChipGroupSkeleton} from "@/components/chipGroup/ChipGroup";

export const getServerSideProps: GetServerSideProps<DiscoverProps> = async ({query}) => {
    const redirect = (page: number) => {
        query.page = page.toString();
        return {
            redirect: {
                destination: Routes.Discover + "?" + stringify(query),
                permanent: false,
            }
        }
    }

    const page = query.page ? parseInt(query.page as string) : 1
    if (page < 1) redirect(1)

    const [blogPage, trendingAuthors] = await Promise.all([getTrendingBlogs(page), getTrendingAuthors()])

    return {
        props: {
            blogPage: blogPage,
            trendingAuthors: trendingAuthors
        }
    }
}

interface DiscoverProps {
    blogPage: BlogPage,
    trendingAuthors: User[]
    className?: string
}

const Discover = ({blogPage, trendingAuthors, className}: DiscoverProps) => {


    return (
        <NavScreen selected={NavPage.Discover}>

            <Stack padding={{xs: '1rem 0 1rem 1rem', md: '2rem 0 2rem 2rem', lg: '4rem 0 4rem 4rem'}} spacing={6}
                   sx={{overflowX: 'hidden'}}>
                <Typography variant='h4' paddingRight={{xs: 2, md: 4, lg: 8}}>
                    Discover Trending this week
                </Typography>

                <Box display={{xs: 'block', md: 'none'}}>
                    <TrendingTopicSection height={1}/>
                </Box>

                <TrendingAuthorSection authors={trendingAuthors}/>

                <Stack direction='row' paddingRight={{xs: 2, md: 4, lg: 8}} spacing={4}>
                    <Box flex={1}>
                        <TrendingBlogsSection blogPage={blogPage}/>
                    </Box>

                    <Box
                        flex={0.3}
                        padding={3}
                        display={{xs: 'none', md: 'block'}}
                        borderLeft='1px solid lightgray'
                    >
                        <TrendingTopicSection height={1}/>
                    </Box>

                </Stack>

            </Stack>

        </NavScreen>
    )
}

interface TrendingAuthorSectionProps {
    authors: User[]
}

const TrendingAuthorSection = ({authors}: TrendingAuthorSectionProps) => {
    return (
        <Stack spacing={2}>
            <Typography variant='h5' fontWeight='400'>Top Authors</Typography>
            <Stack direction='row' spacing={1} overflow='auto' paddingRight={{xs: 2, md: 4, lg: 8}}>
                {authors.map(author =>
                    <AuthorProfileItem
                        key={author._id}
                        author={author}
                        width={{xs: '125px', md: '140px', lg: '150px'}}
                        flexShrink='0'
                    />
                )}
            </Stack>
        </Stack>
    )
}

interface TrendingBlogsSectionProps {
    blogPage: BlogPage
}

const TrendingBlogsSection = ({blogPage: {blogs, page, totalPages}}: TrendingBlogsSectionProps) => {
    const router = useRouter()
    const onBlogClick = (blog: Blog) => router.push(getBlogRoute(blog.slug))
    const onPageChange = (page: number) => router.push({
        query: {...router.query, page: page}
    })
    const blogsEmpty = _.isEmpty(blogs)
    const emptyState = useCallback(() => (
        <EmptyState
            height={1}
            title='There are no blogs yet'
            message='Be the first to create a blog'
        />
    ), [])
    return (
        <Stack spacing={2}>
            <Typography variant='h5' fontWeight='400'>Most Viewed Blogs</Typography>
            {blogsEmpty
                ? emptyState()
                : <>
                    <BlogList blogs={blogs} onBlogClick={onBlogClick}/>
                    <PaginationBar page={page} count={totalPages} onPageChange={onPageChange}
                                   sx={{alignSelf: 'center'}}/>
                </>
            }
        </Stack>
    )
}

interface TrendingTopicSectionProps {
    className?: string
}

const TrendingTopicSection = ({className, ...props}: TrendingTopicSectionProps & StackProps) => {
    const {data: topics, isLoading, error} = useSWR('trending_topics', getTrendingTopics)

    if (error || (topics && _.isEmpty(topics))) return <></>

    return (
        <Stack spacing={2} className={className} {...props}>
            <MultilineText maxLines={2} variant='h5' fontWeight='400'>
                Trending Topics
            </MultilineText>
            {isLoading && <ChipGroupSkeleton count={8}/>}
            {!isLoading &&
                <ChipGroup items={topics!} getLabel={topic => topic.name} sx={{overflowX: 'hidden'}} gap={1}/>}
        </Stack>
    )
}


export default Discover;
