import React from 'react';
import {Box, Stack} from "@mui/material";
import SideNavScreen from "@/components/sideNavScreen/SideNavScreen";
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
        <SideNavScreen>

            <Stack direction="row" sx={{overflow: "hidden"}}>

                <Box className={styles.blogSection}>
                    <HomeBlogSection blogs={blogs}></HomeBlogSection>
                </Box>


                <Box className={styles.discoverSection}></Box>


            </Stack>

        </SideNavScreen>
    )
}

export default HomeScreen;
