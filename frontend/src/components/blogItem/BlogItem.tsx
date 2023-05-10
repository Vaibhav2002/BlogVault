import React from 'react';
import Blog from "@/data/models/Blog";
import {Box, BoxProps, Theme, useMediaQuery} from "@mui/material";
import styles from "./BlogItem.module.css";
import MultilineText from "@/components/styled/MultilineText";
import {FaArrowRight} from "react-icons/fa";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {formatDate} from "@/utils/Helpers";
import {CiBookmark} from "react-icons/ci";
import Image from "next/image";
import ChipGroup from "@/components/chipGroup/ChipGroup";
import AuthorSection from "@/components/author/AuthorSection";

interface BlogItemProps {
    blog: Blog
    className?: string
}

const BlogItem = ({blog: {title, description, createdAt, ...blog}, className, ...props}: BlogItemProps & BoxProps) => {

    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))
    const titleSize = isBelowSm ? "subtitle2" : "h5"
    const descriptionSize = isBelowSm ? "caption" : "body2"
    const descriptionMaxLines = isBelowSm ? 2 : 3

    return (
        <Box className={`${styles.blogCard} ${className}`}{...props} padding='1rem 0'>
            <Box className={styles.blogContent} padding='0 1rem'>

                <AuthorSection author={blog.author} date={formatDate(createdAt)}/>

                <Box marginBottom={isBelowSm ? 0 : 3}>
                    <MultilineText
                        variant={titleSize}
                        maxLines={2}
                        marginBottom="4px"
                        color="text.primary"
                        fontWeight="bold"

                    >
                        {title}
                    </MultilineText>
                    <MultilineText
                        variant={descriptionSize}
                        color="text.secondary"
                        maxLines={descriptionMaxLines}
                        sx={{display: {xs: "none", sm: "block"}}}
                    >
                        {description}
                    </MultilineText>
                </Box>

                <ChipGroup
                    items={blog.topics}
                    getLabel={topic => topic.name}
                    gap={1}
                    size="small"
                />

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

            <Box className={styles.blogImage} flex={isBelowSm ? 0.15 : 0.2}>
                <Image
                    fill
                    style={{objectFit:'cover'}}
                    src={blog.coverImage}
                    alt={title}
                />
            </Box>


        </Box>
    )
}

export default BlogItem;



