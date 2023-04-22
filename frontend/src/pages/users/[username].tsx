import React, {useMemo, useState} from 'react';
import User from "@/data/models/User";
import {getUserProfile} from '@/data/dataSources/UserDataSource';
import {GetServerSideProps} from "next";
import {Box, Button, Stack, Theme, Typography, useMediaQuery} from "@mui/material";
import Image from "next/image";
import styles from "@/styles/ProfilePage.module.css";
import UserAvatar from "@/components/Avatar";
import {formatDate} from "@/utils/Helpers";
import MultilineText from "@/components/styled/MultilineText";
import useSWR from "swr";
import * as blogApi from "@/data/dataSources/BlogDataSource";
import BlogGridItem from "@/components/blogGridItem/BlogGridItem";
import Grid2 from "@mui/material/Unstable_Grid2";
import {AnimatePresence, motion} from "framer-motion";
import BlogGridSkeletonItem from "@/components/blogGridItem/BlogGridSkeletonItem";
import Blog from "@/data/models/Blog";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({params}) => {
    const username = params?.username as string
    if (!username) throw Error("Username not found")
    const user = await getUserProfile(username)
    return {
        props: {user: user}
    }
}

interface ProfilePageProps {
    user: User
    className?: string
}

const ProfilePage = ({user, className}: ProfilePageProps) => {

    const [profileUser, setProfileUser] = useState(user)

    return (
        <Stack
            height="100vh"
            paddingY={8}
            paddingX={{xs: 4, md: 10, lg: 16}}
            sx={{overflowX: "hidden"}}
            spacing={{xs: 4, md: 8}}
        >
            <ProfileHeaderSection user={profileUser}/>
            <ProfileBlogSection user={profileUser}/>
        </Stack>

    )
}

interface ProfileHeaderSectionProps {
    user: User,
    className?: string
}

const ProfileHeaderSection = ({user, className}: ProfileHeaderSectionProps) => {

    const {user:authUser} = useAuthenticatedUser()
    const isAuthUser = !!authUser && authUser?._id === user._id

    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
    const isBelowLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

    const mainNameSize = isBelowSm ? "h5" : isBelowLg ? "h4" : "h3"
    const secondaryNameSize = isBelowSm ? "subtitle1" : "h6"
    const aboutSize = isBelowSm ? "body2" : "body1"

    return (
        <Stack direction={{xs: "column", sm: "row"}} gap={4}>

            <Box className={styles.avatarContainer} sx={{alignSelf: {xs: "center", md: "start"}}}>
                {user?.profilePicUrl
                    ? <Image className={styles.avatar} src={user.profilePicUrl} alt={user.username} fill/>
                    : <UserAvatar username={user.username} size="100"/>
                }
            </Box>

            <Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="overline">{`Joined ${formatDate(user.createdAt)}`}</Typography>
                    {isAuthUser && <Button variant="outlined" sx={{width: 'fit-content'}}>Edit Profile</Button>}
                </Stack>

                <MultilineText maxLines={2} variant={mainNameSize}>{user.displayName ?? user.username}</MultilineText>
                {user.displayName &&
                    <Typography variant={secondaryNameSize} color="text.secondary">{`@${user.username}`}</Typography>
                }

                <Typography variant="caption" marginTop={{xs: 2, md: 4}}>About</Typography>
                <MultilineText maxLines={10} variant={aboutSize}>{user.about}</MultilineText>
            </Stack>

        </Stack>
    )
}


interface ProfileBlogSectionProps {
    user: User
}

const ProfileBlogSection = ({user}: ProfileBlogSectionProps) => {

    const {data: blogs, isLoading, error} = useSWR(user._id, blogApi.getBlogsOfUser)

    const blogGrid = (blogs: Blog[]) =>
        <Grid2 container spacing={6} columns={{xs: 1, md: 2}}>
            <AnimatePresence>
                {blogs.map((blog, index) =>
                    <Grid2
                        width={{xs: 1, md: 0.5}}
                        component={motion.div}
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{delay: index * 0.1, ease: "easeOut"}}
                    ><BlogGridItem blog={blog} key={blog._id}/>
                    </Grid2>
                )}
            </AnimatePresence>
        </Grid2>


    const skeleton = useMemo(() => (
        <Grid2 container spacing={6} columns={{xs: 1, md: 2}}>
            {[...Array(4)].map(item =>
                <Grid2 width={{xs: 1, md: 0.5}}><BlogGridSkeletonItem/></Grid2>
            )}
        </Grid2>
    ), [isLoading])

    return (
        <Box>
            <Typography variant="h6" marginBottom={4}>Blogs</Typography>
            {isLoading && skeleton}
            {error && <Typography variant="body1">Error loading blogs</Typography>}
            {blogs?.length === 0 && <Typography variant="body1">No blogs found</Typography>}
            {blogs && blogGrid(blogs)}
        </Box>
    )
}


export default ProfilePage;
