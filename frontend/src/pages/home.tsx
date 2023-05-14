import React, {useCallback} from 'react';
import {Box, Stack, StackProps} from "@mui/material";
import NavScreen from "@/components/NavScreen/NavScreen";
import Blog, {BlogPage} from "@/data/models/Blog";
import {getAllBlogs} from "@/data/dataSources/BlogDataSource";
import {GetServerSideProps} from "next";
import styles from "@/styles/Home.module.css";
import {useRouter} from "next/router";
import {getBlogRoute} from "@/utils/Routes";
import PaginationBar from "@/components/PaginationBar";
import {stringify} from "querystring";
import {NavScreen as NavPage} from "@/components/navBars/NavOptions";
import DiscoverSection from "@/components/DiscoverSection";
import _ from "lodash";
import EmptyState from "@/components/EmptyState";
import BlogList from "@/components/blogItem/BlogList";


export const getServerSideProps: GetServerSideProps<HomeScreenProps> = async ({query, req}) => {
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

    const blogPage = await getAllBlogs(page, req.headers.cookie)

    if (page > blogPage.totalPages) redirect(blogPage.totalPages)

    console.log(
        JSON.stringify(blogPage.blogs.map(blog => (
            {id: blog._id, isSaved: blog.isSaved}
        )))
    )

    return {
        props: {blogPage: blogPage}
    }
}

interface HomeScreenProps {
    blogPage: BlogPage
}

const HomeScreen = ({blogPage: {page, blogs, totalPages}}: HomeScreenProps) => {
    const areBlogsEmpty = _.isEmpty(blogs)
    const emptyState = useCallback(() => (
        <EmptyState
            height={1}
            title='There are no blogs yet'
            message='Be the first to create a blog'
        />
    ), [])

    return (
        <NavScreen selected={NavPage.Home}>

            <Stack
                direction="row"
                sx={{overflow: "hidden", padding: {xs: 2, md: 0}}}
                height="100%"
            >

                <Box flex={{xs: 1, lg: 0.7}} padding={{sx: 2, md: 8}} overflow='auto'>
                    {areBlogsEmpty
                        ? emptyState()
                        : <HomeBlogSection page={page} totalPages={totalPages} className={styles.blogSection}
                                           blogs={blogs}/>
                    }

                </Box>


                <Box sx={{display: {xs: "none", lg: "block"}}} className={styles.discoverSection}>
                    <DiscoverSection/>
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
        <Stack gap={4} className={className} {...props} >
            <BlogList blogs={blogs} onBlogClick={onBlogClick} spacing={4}/>

            {blogs.length > 0 &&
                <PaginationBar page={page} count={totalPages} onPageChange={onPageChange} sx={{alignSelf: 'center'}}/>
            }
        </Stack>

    )
}


export default HomeScreen;
