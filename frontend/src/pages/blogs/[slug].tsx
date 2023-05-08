import {GetServerSideProps} from "next";
import {getBlogBySlug} from "@/data/dataSources/BlogDataSource";
import Blog from "@/data/models/Blog";
import {Box, BoxProps, Stack, StackProps, Typography} from "@mui/material";
import Markdown from "@/components/Markdown";
import styles from "@/styles/BlogPage.module.css";
import React, {useMemo} from "react";
import {formatDate} from "@/utils/Helpers";
import Image from "next/image";
import CenteredBox from "@/components/styled/CenteredBox";
import MultilineText from "@/components/styled/MultilineText";
import ChipGroup from "@/components/chipGroup/ChipGroup";
import BlogAuthorSection from "@/components/BlogAuthorSection";
import useDevices from "@/hooks/useDevices";
import NavScreen from "@/components/NavScreen/NavScreen";
import BlogCommentSection from "@/components/comments/CommentSection";

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async ({params}) => {
    const slug = params?.slug?.toString();
    if (!slug) throw new Error("Slug is missing");
    const blog = await getBlogBySlug(slug)
    return {
        props: {
            blog: blog
        }
    }
}


interface BlogPageProps {
    blog: Blog
}


const BlogPage = ({blog}: BlogPageProps) => {

    return (
        <NavScreen>
            <Stack
                sx={{
                    paddingX: {xs: "8%", sm: "10%", md: "17%"},
                    paddingY: "6rem",
                    overflowX: "hidden"
                }}
                spacing={8}
                alignItems="stretch"
            >
                <BlogHeader blog={blog}/>

                <BlogContent blog={blog}/>

                <BlogFooter blog={blog}/>

            </Stack>
        </NavScreen>

    )
}


interface BlogHeaderProps {
    blog: Blog
    className?: string
}

const BlogHeader = ({blog, className, ...props}: BlogHeaderProps & StackProps) => {

    const {isMobile} = useDevices()

    const time = useMemo(() => (
        (blog.updatedAt > blog.createdAt)
            ? <>Updated {formatDate(blog.updatedAt)}</>
            : <>{formatDate(blog.createdAt)}</>
    ), [blog.createdAt, blog.updatedAt])

    return (
        <Stack className={className} gap={4} {...props}>
            <Box className={styles.coverImage}>
                <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    style={{borderRadius: "8px"}}
                    sizes="(max-width: 1200px) 100vw, 1280px"
                    priority
                />
            </Box>

            <CenteredBox sx={{flexDirection: "column", gap: 2}}>
                <MultilineText variant={isMobile ? "h5" : "h3"} maxLines={2}
                               textAlign="center">{blog.title}</MultilineText>
                <MultilineText variant={isMobile ? "subtitle2" : "subtitle1"} color="text.secondary" maxLines={6}
                               textAlign="center">
                    {blog.description}
                </MultilineText>
                <Typography variant="body2" color="text.secondary">{time}</Typography>
            </CenteredBox>

            <BlogAuthorSection slug={blog.slug} author={blog.author}/>
        </Stack>
    )
}

interface BlogContentProps {
    blog: Blog
    className?: string
}

const BlogContent = ({blog, className, ...props}: BlogContentProps & BoxProps) => {
    return (
        <Box sx={{overflowX: "hidden"}} {...props}>
            <Markdown className={styles.blogContent}>
                {blog.content}
            </Markdown>
        </Box>
    )
}

interface BlogFooterProps {
    blog: Blog
    className?: string
}

const BlogFooter = ({blog, className, ...props}: BlogFooterProps & StackProps) => {
    return (
        <Stack width={1} spacing={3} className={className} {...props}>
            <ChipGroup items={blog.topics} getLabel={(topic: Topic) => topic.name} alignSelf='center'/>
            <Box>
                <BlogCommentSection blogId={blog._id}/>
            </Box>
        </Stack>
    )
}

export default BlogPage