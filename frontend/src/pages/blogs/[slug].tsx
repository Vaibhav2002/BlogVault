import {GetStaticPaths, GetStaticProps} from "next";
import {getAllSlugs, getBlogBySlug} from "@/data/dataSources/BlogDataSource";
import Blog from "@/data/models/Blog";
import {Stack} from "@mui/material";
import BlogHeader from "@/components/screenComponents/blog/BlogHeader";
import BlogContent from "@/components/screenComponents/blog/BlogContent";
import BlogFooter from "@/components/screenComponents/blog/BlogFooter";

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

    console.log(JSON.stringify(blog.topics.map(topic => topic.name)))

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

export default BlogPage