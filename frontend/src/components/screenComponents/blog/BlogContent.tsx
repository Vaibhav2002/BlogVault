import React from 'react';
import Markdown from "@/components/Markdown";
import styles from "@/styles/BlogPage.module.css";
import {Box, BoxProps} from "@mui/material";
import Blog from "@/data/models/Blog";

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

export default BlogContent;
