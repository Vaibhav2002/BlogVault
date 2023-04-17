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

            <Stack
                direction="row"
                sx={{overflow: "hidden", padding: {xs: 2, md: 0}}}
                height="100%"
            >

                <HomeBlogSection
                    className={styles.blogSection}
                    sx={{
                        flex: {xs: 1, md: 0.7},
                        padding: {sx: 2, md: 8},
                        overflowX: "hidden",
                        overflowY: "auto"
                    }}
                    blogs={blogs}
                />

                <Box
                    sx={{
                        display: {
                            xs: "none",
                            md: "block"
                        }
                    }}
                    className={styles.discoverSection}
                >

                </Box>


            </Stack>

        </SideNavScreen>
    )
}

export default HomeScreen;
