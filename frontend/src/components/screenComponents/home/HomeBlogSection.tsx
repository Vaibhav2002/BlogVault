import React from 'react';
import Blog from "@/data/models/Blog";
import BlogItem from "@/components/blogItem/BlogItem";
import {Box, Stack, StackProps} from "@mui/material";
import {AnimatePresence, motion} from "framer-motion";
import {getBlogRoute} from "@/utils/Routes";
import {useRouter} from "next/router";

interface HomeBlogSectionProps {
    blogs: Blog[]
    className?: string
}

const HomeBlogSection = ({blogs, className, ...props}: HomeBlogSectionProps & StackProps) => {

    const router = useRouter()
    const onBlogClick = async (blog: Blog) => {
        await router.push(getBlogRoute(blog.slug))
    }

    return (
        <Stack gap={4} className={className} {...props}>
            {blogs.map((blog, index) =>
                <AnimatePresence>
                    <Box
                        component={motion.div}
                        initial={{scale: 0.5}}
                        animate={{scale: 1}}
                        transition={{delay: index * 0.05, ease: "easeOut"}}
                    >
                        <BlogItem
                            blog={blog}
                            onClick={() => onBlogClick(blog)}
                        />

                    </Box>
                </AnimatePresence>
            )}
        </Stack>

    )
}

export default HomeBlogSection;
