import React, {useContext, useState} from 'react';
import Blog from "@/data/models/Blog";
import {Box, BoxProps, Skeleton, Stack, Theme, ToggleButton, useMediaQuery} from "@mui/material";
import styles from "./BlogItem.module.css";
import MultilineText from "@/components/styled/MultilineText";
import {FaArrowRight} from "react-icons/fa";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {formatDate} from "@/utils/Helpers";
import {CiBookmark} from "react-icons/ci";
import Image from "next/image";
import ChipGroup, {ChipGroupSkeleton} from "@/components/chipGroup/ChipGroup";
import AuthorSection from "@/components/author/AuthorSection";
import * as saveDataSource from "@/data/dataSources/SavedBlogDataSource";
import useDevices from "@/hooks/useDevices";
import {useRouter} from "next/router";
import {getSearchRouteForTopic} from "@/utils/Routes";
import {AuthModalsContext} from "@/components/modals/auth/AuthModal";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import Topic from "@/data/models/Topic";
import useTracker from "@/hooks/useTracker";

interface BlogItemProps {
    blog: Blog
    className?: string,
    onBlogUnSaved?: (blog: Blog) => void
}

const BlogItem = ({blog, className, onBlogUnSaved, ...props}: BlogItemProps & BoxProps) => {
    const {title, description, createdAt, isSaved: blogSaved, slug} = blog
    const [isSaved, setIsSaved] = useState(!!blogSaved)

    const router = useRouter()
    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))
    const titleSize = isBelowSm ? "subtitle2" : "h5"
    const descriptionSize = isBelowSm ? "caption" : "body2"
    const descriptionMaxLines = isBelowSm ? 2 : 3

    const {showLogin} = useContext(AuthModalsContext)
    const {user} = useAuthenticatedUser()
    const {blogSaveFromCard, blogUnSaveFromCard, topicChipClick, blogCardClick} = useTracker()

    const onSaveToggleButtonClick = async (e: any) => {
        e.stopPropagation()
        if (!user) {
            showLogin()
            return
        }
        try {
            if (isSaved) {
                await saveDataSource.unSaveBlog(slug)
                onBlogUnSaved?.(blog)
                blogUnSaveFromCard(blog)
            } else {
                await saveDataSource.saveBlog(slug)
                blogSaveFromCard(blog)
            }
            setIsSaved(!isSaved)
        } catch (e) {
            alert(e)
        }
    }

    const onTopicClick = async (topic: Topic) => {
        topicChipClick(topic)
        await router.push(getSearchRouteForTopic(topic.name))
    }

    return (
        <Box className={`${styles.blogCard} ${className}`}{...props} padding='1rem 0'>
            <Box className={styles.blogContent} padding='0 1rem'>

                <AuthorSection blog={blog} author={blog.author} date={formatDate(createdAt)} views={blog.views}/>

                <Box marginBottom={isBelowSm ? 0 : 3} sx={{cursor: 'default'}}>
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
                    onOptionSelected={onTopicClick}
                />

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

            <Box className={styles.blogImage} flex={isBelowSm ? 0.15 : 0.2}>
                <Image
                    fill
                    style={{objectFit: 'cover'}}
                    src={blog.posterImage}
                    alt={title}
                />
            </Box>


        </Box>
    )
}


export const BlogItemSkeleton = () => {
    const {isMobile} = useDevices()
    return (
        <Box className={`${styles.blogCard}`} padding='1rem 0'>
            <Box className={styles.blogContent} padding='0 1rem'>

                <Skeleton variant='rounded' width='100%' height={24}/>

                <Stack spacing={1} marginBottom={isMobile ? 0 : 3}>
                    <Skeleton
                        variant='rounded'
                        width='100%'
                        height={32}
                    />
                    <Skeleton
                        variant='rounded'
                        width='100%'
                        height={48}
                        sx={{display: {xs: "none", sm: "block"}}}
                    />
                </Stack>

                <ChipGroupSkeleton count={3} size='small'/>

                <Box
                    className={styles.actionSection}
                    display={isMobile ? "none" : "flex"}
                >
                    <Skeleton
                        variant='rounded'
                        height={48}
                        width={160}
                    />
                    <Skeleton
                        variant='rounded'
                        height={48}
                        width={160}
                    />
                </Box>
            </Box>

            <Box className={styles.blogImage} flex={isMobile ? 0.15 : 0.2}>
                <Skeleton
                    variant='rounded'
                    width={'100%'}
                    height={'100%'}
                />
            </Box>
        </Box>
    )
}

export default BlogItem;



