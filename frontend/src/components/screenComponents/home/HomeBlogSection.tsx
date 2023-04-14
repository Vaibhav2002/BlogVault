import React from 'react';
import Blog from "@/data/models/Blog";
import BlogItem from "@/components/blogItem/BlogItem";
import {Box, Stack} from "@mui/material";
import {AnimatePresence, motion} from "framer-motion";

interface HomeBlogSectionProps {
    blogs: Blog[]
    className?: string
}

const HomeBlogSection = ({blogs, className}: HomeBlogSectionProps) => {
    return (
        <Stack gap={4} className={className}>
            {blogs.map((blog, index) =>
                <AnimatePresence>
                    <Box
                        component={motion.div}
                        initial={{scale: 0.5}}
                        animate={{scale: 1}}
                        transition={{delay: index*0.05, ease: "easeOut"}}
                    >
                        <BlogItem blog={blog}/>
                    </Box>
                </AnimatePresence>

            )}
        </Stack>

    )
}

export default HomeBlogSection;
