import React from 'react';
import Blog from "@/data/models/Blog";
import {Avatar, Box, BoxProps, Theme, Typography, useMediaQuery} from "@mui/material";
import styles from "./BlogItem.module.css";
import MultilineText from "@/components/styled/MultilineText";
import {FaArrowRight} from "react-icons/fa";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {formatDate} from "@/utils/Helpers";
import {CiBookmark} from "react-icons/ci";
import Image from "next/image";

interface BlogItemProps {
    blog: Blog
    className?: string
}

const BlogItem = ({blog: {title, description, createdAt, ...blog}, className, ...props}: BlogItemProps & BoxProps) => {

    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))
    const titleSize = isBelowSm ? "h6" : "h5"
    const descriptionSize = isBelowSm ? "caption" : "body2"
    const descriptionMaxLines = isBelowSm ? 2 : 3

    return (
        <Box
            className={`${styles.blogCard} ${className}`}
            {...props}
        >
            <Box className={styles.blogImage}>
                <Image
                    layout="fill"
                    objectFit="cover"
                    src={blog.coverImage}
                    alt={title}
                />
            </Box>


            <Box className={styles.blogContent}>

                <Box>
                    <MultilineText
                        variant={titleSize}
                        maxLines={1}
                        marginBottom="4px"
                        color="text.primary"

                    >
                        {title}
                    </MultilineText>
                    <MultilineText
                        variant={descriptionSize}
                        color="text.secondary"
                        maxLines={descriptionMaxLines}
                    >
                        {description}
                    </MultilineText>
                </Box>


                <Box className={styles.userInfoSection}>
                    <Box className={styles.userInfo}>
                        <Avatar variant="circular" className={styles.userAvatar}/>
                        <Typography variant="body2" color="text.secondary">User</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">{formatDate(createdAt)}</Typography>
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

export default BlogItem;



