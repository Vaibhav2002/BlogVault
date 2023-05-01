import React from 'react';
import Blog from "@/data/models/Blog";
import {AnimatePresence, motion} from "framer-motion";
import Grid2, {Grid2Props} from "@mui/material/Unstable_Grid2";
import BlogGridItem from "@/components/blogGridItem/BlogGridItem";

interface BlogGridProps {
    blogs: Blog[]
    className?: string
}

const BlogGrid = ({blogs, className, ...props}: BlogGridProps & Grid2Props) => {

    return (
        <Grid2 container spacing={4} columns={{xs: 1, md: 2, xl: 3}} {...props}>
            <AnimatePresence>
                {blogs.map((blog, index) =>
                    <Grid2
                        width={{xs: 1, md: 0.5, xl: 0.33}}
                        component={motion.div}
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{delay: index * 0.1, ease: "easeOut"}}
                    ><BlogGridItem blog={blog} key={blog._id}/>
                    </Grid2>
                )}
            </AnimatePresence>
        </Grid2>
    )
}

export default BlogGrid;
