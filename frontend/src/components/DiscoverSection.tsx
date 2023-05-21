import useSWR from "swr";
import {getTrendingTopics} from "@/data/dataSources/TopicDataSource";
import {Divider, Stack} from "@mui/material";
import MultilineText from "@/components/styled/MultilineText";
import ChipGroup, {ChipGroupSkeleton} from "@/components/chipGroup/ChipGroup";
import React, {useCallback} from "react";
import _ from "lodash";
import {getDiscoverTrendingAuthors, getDiscoverTrendingBlogs} from "@/data/dataSources/BlogDataSource";
import BlogMiniItem, {BlogMiniItemSkeleton} from "@/components/blogItem/BlogMiniItem";
import AuthorItem, {AuthorItemSkeleton} from "@/components/author/AuthorItem";
import {getSearchRouteForTopic} from "@/utils/Routes";
import {useRouter} from "next/router";
import Topic from "@/data/models/Topic";
import useTracker from "@/hooks/useTracker";

interface DiscoverSectionProps {
    showTrendingTopics?: boolean
    showTrendingBlogs?: boolean
    showTrendingAuthors?: boolean
}

const DiscoverSection = (
    {showTrendingTopics = true, showTrendingAuthors = true, showTrendingBlogs = true}: DiscoverSectionProps
) => {

    return (
        <Stack gap={4} padding={4}>
            {showTrendingTopics && <TrendingTopicsSection/>}
            {showTrendingBlogs && <TrendingBlogsSection/>}
            {showTrendingAuthors && <TrendingAuthorsSection/>}
        </Stack>
    )
}


const TrendingTopicsSection = () => {
    const router = useRouter()
    const {data: topics, isLoading, error} = useSWR('trending_topics', getTrendingTopics)
    const {trendingTopicChipClick} = useTracker()
    const onTopicSelected = (topic: Topic) => {
        trendingTopicChipClick(topic)
        router.push(getSearchRouteForTopic(topic.name))
    }


    if (error || (topics && _.isEmpty(topics))) return <></>

    return (
        <Stack spacing={2}>
            <MultilineText maxLines={2} variant='h6'>Trending Topics</MultilineText>
            {isLoading && <ChipGroupSkeleton count={8}/>}
            {!isLoading &&
                <ChipGroup
                    items={topics!}
                    getLabel={topic => topic.name}
                    sx={{overflowX: 'hidden'}}
                    gap={1}
                    onOptionSelected={onTopicSelected}
                />
            }
            <Divider sx={{paddingTop: 2}}/>
        </Stack>
    )
}

const TrendingBlogsSection = () => {
    const {data: blogs, isLoading, error} = useSWR('discover_trending_blogs', getDiscoverTrendingBlogs)

    const skeleton = useCallback(() => (
        <Stack spacing={4}>
            {[...Array(4)].map(() => <BlogMiniItemSkeleton/>)}
        </Stack>
    ), [])

    if (error || (blogs && _.isEmpty(blogs))) return <></>

    return (
        <Stack spacing={2}>
            <MultilineText maxLines={2} variant='h6'>Trending Blogs</MultilineText>
            {isLoading && skeleton()}
            {!isLoading &&
                <Stack spacing={4}>
                    {blogs!.map(blog => <BlogMiniItem blog={blog}/>)}
                </Stack>
            }
            <Divider sx={{paddingTop: 2}}/>
        </Stack>
    )
}

const TrendingAuthorsSection = () => {
    const {data: authors, isLoading, error} = useSWR(
        'trending_authors', getDiscoverTrendingAuthors
    )

    const skeleton = useCallback(() => (
        <Stack spacing={4}>
            {[...Array(4)].map(() => <AuthorItemSkeleton/>)}
        </Stack>
    ), [])

    if (error || (authors && _.isEmpty(authors))) return <></>

    return (
        <Stack spacing={2}>
            <MultilineText maxLines={2} variant='h6'>Top Authors</MultilineText>
            {isLoading && skeleton()}
            {!isLoading &&
                <Stack spacing={4}>
                    {authors!.map(author => <AuthorItem author={author}/>)}
                </Stack>
            }
            <Divider sx={{paddingTop: 2}}/>
        </Stack>
    )
}

export default DiscoverSection