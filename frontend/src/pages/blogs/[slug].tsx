import {GetStaticPaths, GetStaticProps} from "next";
import {getAllSlugs, getBlogBySlug} from "@/data/dataSources/BlogDataSource";
import Blog from "@/data/models/Blog";
import {Box, BoxProps, Stack, Typography} from "@mui/material";
import Markdown from "@/components/Markdown";
import styles from "@/styles/BlogPage.module.css";
import React, {useMemo} from "react";
import {formatDate} from "@/utils/Helpers";
import Image from "next/image";
import CenteredBox from "@/components/styled/CenteredBox";
import MultilineText from "@/components/styled/MultilineText";
import ChipGroup from "@/components/chipGroup/ChipGroup";

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = await getAllSlugs();
    const paths = slugs.map(slug => ({params: {slug}}));
    return {
        paths: paths,
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({params}) => {
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
        <Stack
            sx={{
                paddingX: {xs: "8%", sm: "10%", md: "15%"},
                paddingY: "6rem",
                overflowX: "hidden"
            }}
            spacing={8}
            alignItems="center"
        >
            <BlogHeader blog={blog}/>

            <BlogContent blog={blog}/>

            <BlogFooter blog={blog}/>

        </Stack>
    )
}


interface BlogHeaderProps {
    blog: Blog
    className?: string
}

const BlogHeader = ({blog, className, ...props}: BlogHeaderProps & BoxProps) => {

    const time = useMemo(() => (
        (blog.updatedAt > blog.createdAt)
            ? <>Updated {formatDate(blog.updatedAt)}</>
            : <>{formatDate(blog.createdAt)}</>
    ), [blog.createdAt, blog.updatedAt])

    return (
        <Box className={className} {...props}>
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
                <MultilineText variant="h3" maxLines={2} textAlign="center">{blog.title}</MultilineText>
                <MultilineText variant="subtitle1" color="text.secondary" maxLines={6} textAlign="center">
                    {blog.description}
                </MultilineText>
                <Typography variant="body2" color="text.secondary">{time}</Typography>
            </CenteredBox>
        </Box>
    )
}

interface BlogContentProps {
    blog: Blog
    className?: string
}

const BlogContent = ({blog, className, ...props}: BlogContentProps & BoxProps) => {
    return (
        <Box sx={{overflowX: "hidden", width: "100%"}} paddingTop={4} {...props}>
            <Markdown className={styles.blogContent}>
                {blog.content}
            </Markdown>
        </Box>
    )
}

interface BlogFooterProps {
    blog:Blog
    className?: string
}

const BlogFooter = ({blog, className, ...props}: BlogFooterProps & BoxProps) => {
    return (
        <Box className={className} {...props}>
            <ChipGroup items={blog.topics} getLabel={(topic:Topic) => topic.name} />
        </Box>
    )
}

export default BlogPage