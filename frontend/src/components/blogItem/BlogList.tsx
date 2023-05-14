import React from 'react';
import Blog from "@/data/models/Blog";
import {AnimatePresence} from "framer-motion";
import AnimatedBox from "@/components/animated/AnimatedBox";
import BlogItem, {BlogItemSkeleton} from "@/components/blogItem/BlogItem";
import {Divider, Stack, StackProps} from "@mui/material";

interface BlogListProps {
    blogs: Blog[],
    onBlogClick: (blog: Blog) => void,
    onBlogUnSaved?: (blog: Blog) => void
    className?: string
}

const BlogList = ({blogs, onBlogClick, onBlogUnSaved, className, ...props}: BlogListProps & StackProps) => {
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
                        <BlogItem
                            blog={blog}
                            onClick={() => onBlogClick(blog)}
                            onBlogUnSaved={onBlogUnSaved}
                        />
                        <Divider/>

                    </AnimatedBox>
                </AnimatePresence>
            ))}
        </Stack>
    )
}

interface BlogSkeletonListProps {
    count: number
}

export const BlogSkeletonList = ({count, ...props}: BlogSkeletonListProps & StackProps) => {
    return (
        <Stack spacing={1} {...props}>
            {[...Array(count)].map((_) => (
                    <>
                        <BlogItemSkeleton/>
                        <Divider/>
                    </>
                )
            )}
        </Stack>
    )
}

export default BlogList;
