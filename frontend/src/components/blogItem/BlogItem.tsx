import React from 'react';
import Blog from "@/data/models/Blog";
import {Box, BoxProps, Theme, Typography, useMediaQuery} from "@mui/material";
import styles from "./BlogItem.module.css";
import MultilineText from "@/components/styled/MultilineText";
import {FaArrowRight} from "react-icons/fa";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {formatDate} from "@/utils/Helpers";
import {CiBookmark} from "react-icons/ci";
import Image from "next/image";
import UserAvatar from "@/components/Avatar";
import ChipGroup from "@/components/chipGroup/ChipGroup";

interface BlogItemProps {
    blog: Blog
    className?: string
}

const BlogItem = ({blog: {title, description, createdAt, ...blog}, className, ...props}: BlogItemProps & BoxProps) => {

    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))
    const titleSize = isBelowSm ? "subtitle2" : "h5"
    const descriptionSize = isBelowSm ? "caption" : "body2"
    const descriptionMaxLines = isBelowSm ? 2 : 3
    const avatarSize = isBelowSm ? "small" : "medium"


    return (
        <Box
            className={`${styles.blogCard} ${className}`}
            {...props}
        >
            <Box className={styles.blogImage} flex={isBelowSm ? 0.15 : 0.2}>
                <Image
                    layout="fill"
                    objectFit="cover"
                    src={blog.coverImage}
                    alt={title}
                />
            </Box>


            <Box className={styles.blogContent}>

                <Box className={styles.userInfoSection}>
                    <Box className={styles.userInfo}>
                        <UserAvatar size={avatarSize} url={blog.author.profilePicUrl}/>
                        <Typography variant="caption" color="text.secondary">{blog.author.username}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">{formatDate(createdAt)}</Typography>
                </Box>

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

        </Box>
    )
}

export default BlogItem;



