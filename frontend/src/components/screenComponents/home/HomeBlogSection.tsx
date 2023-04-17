import React from 'react';
import Blog from "@/data/models/Blog";
import BlogItem from "@/components/blogItem/BlogItem";
import {Box, Stack, StackProps} from "@mui/material";
import {AnimatePresence, motion} from "framer-motion";

interface HomeBlogSectionProps {
    blogs: Blog[]
    className?: string
}

const HomeBlogSection = ({blogs, className, ...props}: HomeBlogSectionProps & StackProps) => {
    return (
        <Stack gap={4} className={className} {...props}>
            {blogs.map((blog, index) =>
                <AnimatePresence>
                    <Box
                        component={motion.div}
                        initial={{scale: 0.5}}
                        animate={{scale: 1}}
                        transition={{delay: index*0.05, ease: "easeOut"}}
                    >
                        <BlogItem
                            blog={blog}
                            sx={{height: { xs: "7rem", sm:"9rem", md:"12rem"}}}
                        />
                    </Box>
                </AnimatePresence>

            )}
        </Stack>

    )
}

export default HomeBlogSection;
