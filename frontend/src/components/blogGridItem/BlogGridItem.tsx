import React, {useContext, useState} from 'react';
import Blog from "@/data/models/Blog";
import {Box, BoxProps, Theme, ToggleButton, Typography, useMediaQuery} from "@mui/material";
import styles from "@/components/blogGridItem/BlogGridItem.module.css";
import Image from "next/image";
import {formatDate} from "@/utils/Helpers";
import MultilineText from "@/components/styled/MultilineText";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {CiBookmark} from "react-icons/ci";
import {FaArrowRight} from "react-icons/fa";
import * as saveDataSource from "@/data/dataSources/SavedBlogDataSource";
import {AuthModalsContext} from "@/components/modals/auth/AuthModal";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import useTracker from "@/hooks/useTracker";

interface BlogGridItemProps {
    blog: Blog
    className?: string
}

const BlogGridItem = ({blog, className, ...props}: BlogGridItemProps & BoxProps) => {

    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))
    const titleSize = isBelowSm ? "subtitle2" : "subtitle1"

    const [isSaved, setIsSaved] = useState(!!blog.isSaved)

    const {showLogin} = useContext(AuthModalsContext)
    const {user} = useAuthenticatedUser()
    const {blogSaveFromCard, blogUnSaveFromCard} = useTracker()

    const onSaveToggleButtonClick = async (e: any) => {
        e.stopPropagation()
        if (!user) {
            showLogin()
            return
        }
        try {
            if (isSaved) {
                await saveDataSource.unSaveBlog(blog.slug)
                blogUnSaveFromCard(blog)
            } else {
                await saveDataSource.saveBlog(blog.slug)
                blogSaveFromCard(blog)
            }
            setIsSaved(!isSaved)
        } catch (e) {
            alert(e)
        }
    }


    return (
        <Box className={`${styles.blogCard} ${className}`} {...props}>
            <Box className={styles.blogImage}>
                <Image fill style={{objectFit: 'cover'}} src={blog.posterImage} alt={blog.title}/>
            </Box>


            <Box className={styles.blogContent} sx={{cursor: 'default'}}>

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
                    <ToggleButton
                        sx={{borderRadius: '8px', border: '0px'}}
                        color='secondary'
                        value='Save For Later'
                        size='small'
                        onClick={onSaveToggleButtonClick}
                        selected={isSaved}
                    >
                        <CiBookmark style={{marginRight: '0.5rem'}}/>
                        {isSaved ? 'Saved' : 'Save for later'}
                    </ToggleButton>
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
