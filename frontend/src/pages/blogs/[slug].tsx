import {GetStaticPaths, GetStaticProps} from "next";
import {getAllSlugs, getBlogBySlug} from "@/data/dataSources/BlogDataSource";
import Blog from "@/data/models/Blog";
import {Box, Stack, Typography} from "@mui/material";
import Image from "next/image";
import MultilineText from "@/components/styled/MultilineText";
import {formatDate} from "@/utils/Helpers";
import {useMemo} from "react";
import styles from "@/components/screenComponents/blog/BlogPage.module.css";
import ReactMarkdown from "react-markdown";
import CenteredBox from "@/components/styled/CenteredBox";

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

    const time = useMemo(() => (
        (blog.updatedAt > blog.createdAt)
            ? <>Updated {formatDate(blog.updatedAt)}</>
            : <>{formatDate(blog.createdAt)}</>
    ), [blog.createdAt, blog.updatedAt])

    return (
        <Stack
            sx={{
                paddingX: {xs: "8%", sm: "10%", md: "15%"},
                paddingY: "6rem"
            }}
            spacing={4}
            alignItems="center"
        >
            <Box className={styles.coverImage}>
                <Image src={blog.coverImage} alt={blog.title} fill/>
            </Box>

            <CenteredBox sx={{flexDirection:"column", gap:2}}>
                <MultilineText variant="h4" maxLines={2} textAlign="center">{blog.title}</MultilineText>
                <MultilineText variant="body1" color="text.secondary" maxLines={6} textAlign="center">{blog.description}</MultilineText>
                <Typography variant="caption" color="text.secondary">{time}</Typography>
            </CenteredBox>


            <ReactMarkdown className={styles.blogContext}>{blog.content}</ReactMarkdown>

        </Stack>
    )
}

export default BlogPage