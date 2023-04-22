import React from 'react';
import Blog from "@/data/models/Blog";
import {Box, BoxProps, Theme, Typography, useMediaQuery} from "@mui/material";
import styles from "@/components/blogGridItem/BlogGridItem.module.css";
import Image from "next/image";
import {formatDate} from "@/utils/Helpers";
import MultilineText from "@/components/styled/MultilineText";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {CiBookmark} from "react-icons/ci";
import {FaArrowRight} from "react-icons/fa";

interface BlogGridItemProps {
    blog:Blog
    className?: string
}

const BlogGridItem = ({blog, className, ...props}: BlogGridItemProps & BoxProps) => {

    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))
    const titleSize = isBelowSm? "subtitle2" : "subtitle1"

    return (
        <Box className={`${styles.blogCard} ${className}`} {...props}>
            <Box className={styles.blogImage}>
                <Image fill style={{objectFit:'cover'}} src={blog.coverImage} alt={blog.title}/>
            </Box>


            <Box className={styles.blogContent}>

                <Box marginBottom={2}>
                    <Typography variant="overline" color="text.secondary">
                        {formatDate(blog.createdAt)}
                    </Typography>

                    <MultilineText
                        variant={titleSize}
                        maxLines={2}
                        marginTop={-0.5}
                        color="text.primary"
                        fontWeight="bold"

                    >
                        {blog.title}
                    </MultilineText>
                    <MultilineText
                        variant="caption"
                        color="text.secondary"
                        maxLines={3}
                    >
                        {blog.description}
                    </MultilineText>
                </Box>

                <Box
                    className={styles.actionSection}
                    display={isBelowSm ? "none" : "flex"}
                >
                    <PrimaryButton
                        size="small"
                        startIcon={<CiBookmark/>}
                        variant="text"
                        onClick={e => e.stopPropagation()}
                        sx={{paddingLeft: 0, color: "text.secondary"}}
                    >
                        Save for later
                    </PrimaryButton>
                    <PrimaryButton
                        size="small"
                        endIcon={<FaArrowRight size="16px"/>}
                        variant="text"
                        sx={{color: "text.secondary"}}
                    >
                        Read more
                    </PrimaryButton>
                </Box>
            </Box>

        </Box>
    )
}

export default BlogGridItem;
