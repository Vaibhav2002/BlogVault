import React from 'react';
import {Box, Divider, Stack, StackProps} from "@mui/material";
import NavScreen from "@/components/NavScreen/NavScreen";
import Blog from "@/data/models/Blog";
import {getAllBlogs} from "@/data/dataSources/BlogDataSource";
import {GetStaticProps} from "next";
import styles from "@/styles/Home.module.css";
import {useRouter} from "next/router";
import {getBlogRoute} from "@/utils/Routes";
import {AnimatePresence, motion} from "framer-motion";
import BlogItem from "@/components/blogItem/BlogItem";


export const getStaticProps: GetStaticProps<HomeScreenProps> = async () => {
    const blogs = await getAllBlogs()
        .then(blogs => blogs.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1))
    return {
        props: {blogs: blogs},
        revalidate: 15 * 60 //1 hour
    }
}

interface HomeScreenProps {
    blogs: Blog[]
}

const HomeScreen = ({blogs}: HomeScreenProps) => {

    return (
        <NavScreen selected={0}>

            <Stack
                direction="row"
                sx={{overflow: "hidden", padding: {xs: 2, md: 0}}}
                height="100%"
            >

                <HomeBlogSection
                    sx={{
                        flex: {xs: 1, lg: 0.7},
                        padding: {sx: 2, md: 8}
                    }}
                    className={styles.blogSection}
                    blogs={blogs}
                />

                <Box
                    sx={{display: {xs: "none", md: "block"}}}
                    className={styles.discoverSection}
                >


                </Box>


            </Stack>

        </NavScreen>
    )
}

interface HomeBlogSectionProps {
    blogs: Blog[]
    className?: string
}

const HomeBlogSection = ({blogs, className, ...props}: HomeBlogSectionProps & StackProps) => {

    const router = useRouter()
    const onBlogClick = async (blog: Blog) => {
        await router.push(getBlogRoute(blog.slug))
    }

    return (
        <Stack gap={4} className={className} {...props}>
            {blogs.map((blog, index) =>
                <AnimatePresence>
                    <Box
                        component={motion.div}
                        initial={{scale: 0.5}}
                        animate={{scale: 1}}
                        transition={{delay: index * 0.05, ease: "easeOut"}}
                    >
                        <BlogItem blog={blog} onClick={() => onBlogClick(blog)}/>
                        <Divider />

                    </Box>
                </AnimatePresence>
            )}
        </Stack>

    )
}

export default HomeScreen;
