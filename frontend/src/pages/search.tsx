import React, {useMemo, useRef, useState} from 'react';
import NavScreen from "@/components/NavScreen/NavScreen";
import {NavScreen as NavPage} from "@/components/navBars/NavOptions";
import {BoxProps, IconButton, InputBase, Stack, Typography} from "@mui/material";
import CenteredBox from "@/components/styled/CenteredBox";
import {SearchRounded} from "@mui/icons-material";
import useDevices from "@/hooks/useDevices";
import _ from "lodash";
import useSWR from "swr";
import {getAllTopics} from "@/data/dataSources/TopicDataSource";
import ChipGroup, {ChipGroupSkeleton} from "@/components/chipGroup/ChipGroup";
import Blog from "@/data/models/Blog";
import {searchBlogs} from "@/data/dataSources/BlogDataSource";
import BlogList, {BlogSkeletonList} from "@/components/blogItem/BlogList";
import {getBlogRoute} from "@/utils/Routes";
import PaginationBar from "@/components/PaginationBar";
import {useRouter} from "next/router";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import {HttpError} from "@/data/HttpErrors";

interface Query {
    q?: string
    topic?: string
}

const SearchPage = () => {
    const q = useRouter().query.q?.toString()
    const topicQuery = useRouter().query.topic?.toString()
    const [searchQuery, setSearchQuery] = useState<string | undefined>(q);
    const [topic, setTopic] = useState<string | undefined>(topicQuery);
    const [query, setQuery] = useState<Query>({q: searchQuery, topic: topic})

    const onSearchClick = () => {
        setTopic(undefined)
        setQuery({q: searchQuery})
    }

    const onTopicSelected = (topic?: string) => {
        setTopic(topic)
        setQuery({q: searchQuery, topic: topic})
    }

    return (
        <NavScreen selected={NavPage.Search}>
            <CenteredBox>
                <Stack
                    height={1}
                    alignItems='stretch'
                    paddingY={{xs: '4rem', md: '6rem'}}
                    spacing='4rem'
                    width={{xs: '90%', md: '80%', lg: '70%', xl: '60%'}}
                >
                    <Header/>
                    <SearchBar
                        query={searchQuery ?? ''}
                        onQueryChange={setSearchQuery}
                        onSearchPress={onSearchClick}/>
                    <TopicSection onTopicSelected={onTopicSelected} selectedTopic={topic}/>
                    <BlogSection query={query}/>
                </Stack>
            </CenteredBox>
        </NavScreen>
    )
}

const Header = (props: BoxProps) => {
    const {isMobile} = useDevices()
    return (
        <CenteredBox flexDirection='column' gap={1} textAlign='center' {...props}>
            <Typography variant={isMobile ? 'h4' : "h3"} color='text.primary'>Explore Our Blog</Typography>
            <Typography variant={isMobile ? 'subtitle1' : "h6"} color='text.secondary' fontWeight='400'>
                Search our blog for relevant articles and information
            </Typography>
        </CenteredBox>
    )
}

interface SearchBarProps {
    query: string
    onQueryChange: (query: string) => void
    onSearchPress: () => void
}

const SearchBar = ({query, onQueryChange, onSearchPress, ...props}: SearchBarProps & BoxProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearchPress()
            inputRef.current?.blur()
        }
    }

    return (
        <CenteredBox gap={2} {...props}>
            <InputBase
                ref={inputRef}
                value={query}
                onChange={e => onQueryChange(e.target.value)}
                placeholder='Type your search query here...'
                onKeyDown={onKeyDown}
                sx={{
                    flex: {xs: '0.8', md: '0.6'},
                    padding: '1rem 2rem',
                    borderRadius: '20rem',
                    fontSize: {xs: '1rem', md: '1.2rem'},
                    backgroundColor: 'background.paper'
                }}

            />
            <IconButton
                disabled={_.isEmpty(query)}
                onClick={onSearchPress}
                size='large'
                sx={{
                    color: 'primary.contrastText',
                    backgroundColor: 'primary.main',
                    aspectRatio: '1/1',
                    height: '100%',
                    '&:hover': {backgroundColor: 'primary.light'},
                    '&:disabled': {backgroundColor: 'background.paper'},
                    transition: 'background-color 0.4s ease-in-out'
                }}
            >
                <SearchRounded/>
            </IconButton>
        </CenteredBox>
    )
}

interface TopicSectionProps {
    selectedTopic?: string
    onTopicSelected: (topic?: string) => void
}

const TopicSection = ({selectedTopic, onTopicSelected}: TopicSectionProps) => {
    const {data: topics, isLoading} = useSWR('topics', getAllTopics)
    const topicNames = topics?.map<string>(topic => topic.name)
    const onTopicClick = (option: string) => {
        if (option === selectedTopic)
            onTopicSelected(undefined)
        else
            onTopicSelected(option)
    }

    return (
        <CenteredBox>
            {isLoading && <ChipGroupSkeleton count={6} gap={1}/>}
            {topicNames && !_.isEmpty(topicNames) &&
                <ChipGroup
                    items={topicNames}
                    getLabel={data => data}
                    onOptionSelected={onTopicClick}
                    selectable
                    selected={selectedTopic}
                    gap={1}
                    sx={{justifyContent: 'center'}}
                />
            }
        </CenteredBox>
    )
}

interface BlogsSectionProps {
    query: Query
}

const BlogSection = ({query}: BlogsSectionProps) => {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const {data: blogPage, isLoading, error} = useSWR(
        [query, page, `search_${JSON.stringify(query)}_${page}`],
        ([query, page]) => searchBlogs({...query, page})
    )

    const onBlogClick = async (blog: Blog) => {
        await router.push(getBlogRoute(blog.slug))
    }

    const emptyState = useMemo(() => (
        <CenteredBox>
            <EmptyState title='No Blogs Found' message='Try searching for something else'/>
        </CenteredBox>
    ), []);

    const errorState = useMemo(() => {
        if (error instanceof HttpError)
            return (
                <CenteredBox>
                    <ErrorState title='Oops! Something went wrong' message={'heuheuheuh'}/>
                </CenteredBox>
            )
        if (error) alert(error)
        return <></>
    }, [error]);

    return (
        <CenteredBox flexDirection='column'>
            {isLoading && <BlogSkeletonList count={5} width={1}/>}
            {blogPage && !_.isEmpty(blogPage.blogs) &&
                <Stack spacing={4} width={1} alignItems='center'>
                    <BlogList blogs={blogPage.blogs} onBlogClick={onBlogClick} width={1} spacing={2}/>
                    <PaginationBar page={page} count={blogPage.totalPages} onPageChange={setPage}/>
                </Stack>
            }
            {blogPage && _.isEmpty(blogPage.blogs) && emptyState}
            {errorState}
        </CenteredBox>
    )
}

export default SearchPage;
