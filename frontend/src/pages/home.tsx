import React from 'react';
import {Box, Divider, Stack, StackProps} from "@mui/material";
import NavScreen from "@/components/NavScreen/NavScreen";
import Blog, {BlogPage} from "@/data/models/Blog";
import {getAllBlogs} from "@/data/dataSources/BlogDataSource";
import {GetServerSideProps} from "next";
import styles from "@/styles/Home.module.css";
import {useRouter} from "next/router";
import {getBlogRoute} from "@/utils/Routes";
import {AnimatePresence, motion} from "framer-motion";
import BlogItem from "@/components/blogItem/BlogItem";
import PaginationBar from "@/components/PaginationBar";
import {stringify} from "querystring";


export const getServerSideProps: GetServerSideProps<HomeScreenProps> = async ({query}) => {
    const redirect = (page: number) => {
        query.page = page.toString();
        return {
            redirect: {
                destination: "/home?" + stringify(query),
                permanent: false,
            }
        }
    }

    const page = query.page ? parseInt(query.page as string) : 1
    if (page < 1) redirect(1)

    const blogPage = await getAllBlogs(page)

    if (page > blogPage.totalPages) redirect(blogPage.totalPages)


    return {
        props: {blogPage: blogPage},
    }
}

interface HomeScreenProps {
    blogPage: BlogPage
}

const HomeScreen = ({blogPage: {page, blogs, totalPages}}: HomeScreenProps) => {

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
                    page={page}
                    totalPages={totalPages}
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
    page: number
    blogs: Blog[]
    totalPages: number
    className?: string
}

const HomeBlogSection = ({page, blogs, totalPages, className, ...props}: HomeBlogSectionProps & StackProps) => {

    const router = useRouter()
    const onBlogClick = async (blog: Blog) => {
        await router.push(getBlogRoute(blog.slug))
    }

    const onPageChange = async (page: number) => {
        await router.push({query: {...router.query, page}})
    }

    return (
        <Stack gap={4} className={className} {...props} alignItems="center" justifyContent="stretch">
            {blogs.map((blog, index) =>
                <AnimatePresence key={blog._id}>
                    <Box
                        width={1}
                        component={motion.div}
                        initial={{scale: 0.5}}
                        animate={{scale: 1}}
                        transition={{delay: index * 0.05, ease: "easeOut"}}
                    >
                        <BlogItem blog={blog} onClick={() => onBlogClick(blog)}/>
                        <Divider/>

                    </Box>
                </AnimatePresence>
            )}

            { blogs.length > 0 &&
                <PaginationBar page={page} count={totalPages} onPageChange={onPageChange}/>
            }
        </Stack>

    )
}

export default HomeScreen;
