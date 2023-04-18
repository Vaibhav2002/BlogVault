import React, {useMemo} from 'react';
import Blog from "@/data/models/Blog";
import {Box, BoxProps, Typography} from "@mui/material";
import styles from "@/styles/BlogPage.module.css";
import Image from "next/image";
import CenteredBox from "@/components/styled/CenteredBox";
import MultilineText from "@/components/styled/MultilineText";
import {formatDate} from "@/utils/Helpers";

interface BlogHeaderProps {
    blog: Blog
    className?: string
}

const BlogHeader = ({blog, className, ...props}: BlogHeaderProps & BoxProps) => {

    const time = useMemo(() => (
        (blog.updatedAt > blog.createdAt)
            ? <>Updated {formatDate(blog.updatedAt)}</>
            : <>{formatDate(blog.createdAt)}</>
    ), [blog.createdAt, blog.updatedAt])

    return (
        <Box className={className} {...props}>
            <Box className={styles.coverImage}>
                <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    style={{borderRadius: "8px"}}
                />
            </Box>

            <CenteredBox sx={{flexDirection: "column", gap: 2}}>
                <MultilineText variant="h3" maxLines={2} textAlign="center">{blog.title}</MultilineText>
                <MultilineText
                    variant="subtitle1"
                    color="text.secondary"
                    maxLines={6}
                    textAlign="center"
                >
                    {blog.description}
                </MultilineText>
                <Typography variant="body2" color="text.secondary">{time}</Typography>
            </CenteredBox>
        </Box>
    )
}

export default BlogHeader;
