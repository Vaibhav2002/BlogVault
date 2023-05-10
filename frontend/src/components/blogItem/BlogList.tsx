import React from 'react';
import Blog from "@/data/models/Blog";
import {AnimatePresence} from "framer-motion";
import AnimatedBox from "@/components/animated/AnimatedBox";
import BlogItem from "@/components/blogItem/BlogItem";
import {Divider, Stack, StackProps} from "@mui/material";

interface BlogListProps {
    blogs: Blog[],
    onBlogClick: (blog: Blog) => void
    className?: string
}

const BlogList = ({blogs, onBlogClick, className, ...props}: BlogListProps & StackProps) => {
    return (
        <Stack spacing={1} {...props}>
            {blogs.map((blog, index) => (
                <AnimatePresence key={blog._id}>
                    <AnimatedBox
                        width={1}
                        initial={{scale: 0.5}}
                        animate={{scale: 1}}
                        transition={{delay: index * 0.05, ease: "easeOut"}}
                    >
                        <BlogItem blog={blog} onClick={() => onBlogClick(blog)}/>
                        <Divider/>

                    </AnimatedBox>
                </AnimatePresence>
            ))}
        </Stack>
    )
}

export default BlogList;
