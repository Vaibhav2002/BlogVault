import React from 'react';
import Blog from "@/data/models/Blog";
import styles from "@/components/blogItem/BlogItem.module.css";
import {Box, Skeleton, Stack} from "@mui/material";
import AuthorSection from "@/components/AuthorSection";
import {formatDate} from "@/utils/Helpers";
import MultilineText from "@/components/styled/MultilineText";
import Image from "next/image";
import Link from "next/link";
import {getBlogRoute} from "@/utils/Routes";

interface BlogMiniItemProps {
    blog: Blog
    className?: string
}

const BlogMiniItem = ({blog, className}: BlogMiniItemProps) => {
    return (
        <Box
            className={`${styles.blogCard} ${className}`}
            padding={0}
            component={Link}
            href={getBlogRoute(blog.slug)}
        >
            <Box className={styles.blogContent}>

                <AuthorSection author={blog.author} date={formatDate(blog.createdAt)} avatarSize='small'/>

                <Stack spacing={0.5}>
                    <MultilineText variant='h6' maxLines={1} color="text.primary">
                        {blog.title}
                    </MultilineText>
                    <MultilineText variant='body2' color="text.secondary" maxLines={2}>
                        {blog.description}
                    </MultilineText>
                </Stack>
            </Box>

            <Box className={styles.blogImage} flex={0.2}>
                <Image fill style={{objectFit: 'cover'}} src={blog.coverImage} alt={blog.title}/>
            </Box>
        </Box>
    )
}

export const BlogMiniItemSkeleton = () => {
    return (
        <Box className={`${styles.blogCard}`} padding={0} gap={2}>
            <Box className={styles.blogContent}>
                <Skeleton variant='rectangular' height='1rem'/>
                <Skeleton variant='rectangular' height='1rem'/>
                <Skeleton variant='rectangular' height='2rem'/>
            </Box>

            <Box className={styles.blogImage} flex={0.2}>
                <Skeleton variant='rectangular' width='100%' height='100%'/>
            </Box>
        </Box>
    )
}

export default BlogMiniItem;
