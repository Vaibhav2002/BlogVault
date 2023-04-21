import React from 'react';
import {Box, Stack} from "@mui/material";
import NavScreen from "@/components/NavScreen/NavScreen";
import Blog from "@/data/models/Blog";
import {getAllBlogs} from "@/data/dataSources/BlogDataSource";
import {GetStaticProps} from "next";
import HomeBlogSection from "@/components/screenComponents/home/HomeBlogSection";
import styles from "@/styles/Home.module.css";


export const getStaticProps: GetStaticProps<HomeScreenProps> = async () => {
    const blogs = await getAllBlogs()
        .then(blogs => blogs.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1))
    return {
        props: {
            blogs: blogs
        },
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

export default HomeScreen;
