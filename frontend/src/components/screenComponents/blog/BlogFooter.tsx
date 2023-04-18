import React from 'react';
import {Box, BoxProps} from "@mui/material";
import ChipGroup from "@/components/chipGroup/ChipGroup";
import Blog from "@/data/models/Blog";

interface BlogFooterProps {
    blog:Blog
    className?: string
}

const BlogFooter = ({blog, className, ...props}: BlogFooterProps & BoxProps) => {
    return (
        <Box className={className} {...props}>
            <ChipGroup chips={blog.topics} getLabel={(topic:Topic) => topic.name} />
        </Box>
    )
}

export default BlogFooter;
