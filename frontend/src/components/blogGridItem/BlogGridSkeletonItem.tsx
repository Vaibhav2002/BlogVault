import React from 'react';
import {Box, Skeleton, Stack} from "@mui/material";
import styles from "@/components/blogGridItem/BlogGridItem.module.css";

interface BlogGridSkeletonItemProps {
    className?: string
}

const BlogGridSkeletonItem = ({className}: BlogGridSkeletonItemProps) => {

    return (
        <Box className={`${styles.blogCard} ${className}`}>
            <Box className={styles.blogImage}>
                <Skeleton animation="wave" variant="rectangular" width="100%" height="100%"/>
            </Box>


            <Stack flex={0.8} marginLeft={2}>
                <Skeleton animation="wave" variant="text" sx={{fontSize: "0.8rem"}}/>

                <Skeleton animation="wave" variant="text" sx={{fontSize: "1.5rem"}}/>

                <Skeleton animation="wave" variant="text" sx={{fontSize: "3rem"}}/>

            </Stack>
        </Box>
    )
}

export default BlogGridSkeletonItem;
