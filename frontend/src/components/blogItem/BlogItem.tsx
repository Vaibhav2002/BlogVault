import React from 'react';
import Blog from "@/data/models/Blog";
import {Avatar, Box, Typography} from "@mui/material";
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

const BlogItem = ({blog: {title, description, createdAt, ...blog}, className}: BlogItemProps) => {


    return (
        <Box className={`${styles.blogCard} ${className}`}>
            {/*Will be replaced by image*/}
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
                    <MultilineText variant="h6" maxLines={1} marginBottom="4px">{title}</MultilineText>
                    <MultilineText variant="caption" color="text.secondary" maxLines={3}>{description}</MultilineText>
                </Box>


                <Box className={styles.userInfoSection}>
                    <Box className={styles.userInfo}>
                        <Avatar variant="circular" className={styles.userAvatar}/>
                        <Typography variant="body2" color="text.secondary">User</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">{formatDate(createdAt)}</Typography>
                </Box>


                <Box className={styles.actionSection}>
                    <PrimaryButton
                        size="small"
                        startIcon={<CiBookmark/>}
                        variant="text"
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



