import React, {useState} from 'react';
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
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import BlogSkeletonGrid from "@/components/blogGrid/BlogSkeletonGrid";
import BlogGrid from "@/components/blogGrid/BlogGrid";
import UpdateProfileModal from "@/components/modals/updateProfile/UpdateProfileModal";
import PaginationBar from "@/components/PaginationBar";

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
}

const ProfilePage = ({user}: ProfilePageProps) => {
    return (
        <Profile user={user} key={user._id}/>
    )
}

const Profile = ({user}: ProfilePageProps) => {

    const [profileUser, setProfileUser] = useState(user)
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    const onUserUpdated = (user: User) => {
        setProfileUser(user)
    }

    return (
        <Stack
            height="100vh"
            paddingY={8}
            paddingX={{xs: 4, md: 10, lg: 16}}
            sx={{overflowX: "hidden"}}
            spacing={{xs: 4, md: 8}}
        >
            <ProfileHeaderSection user={profileUser} onUpdateProfileClick={() => setShowUpdateModal(true)}/>
            <ProfileBlogSection user={profileUser}/>
            {showUpdateModal &&
                <UpdateProfileModal
                    user={profileUser}
                    onDismiss={() => setShowUpdateModal(false)}
                    onUpdated={onUserUpdated}
                />
            }
        </Stack>

    )
}

interface ProfileHeaderSectionProps {
    user: User,
    onUpdateProfileClick: () => void
    className?: string
}

const ProfileHeaderSection = ({user, onUpdateProfileClick, className}: ProfileHeaderSectionProps) => {

    const {user: authUser} = useAuthenticatedUser()
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
                    ? <Image className={styles.avatar} src={user.profilePicUrl} alt={user.username ?? ''} fill/>
                    : <UserAvatar username={user.username} size="100"/>
                }
            </Box>

            <Stack flex={1}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="overline">{`Joined ${formatDate(user.createdAt)}`}</Typography>
                    {isAuthUser &&
                        <Button variant="outlined" onClick={onUpdateProfileClick} sx={{width: 'fit-content'}}>
                            Edit Profile
                        </Button>
                    }
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

    const [page, setPage] = useState(1);

    const {data: blogPage, isLoading, error} = useSWR(
        [user._id, page, "user-blogs"],
        ([userId, page]) => blogApi.getBlogsOfUser(userId, page)
    )


    const blogs = blogPage?.blogs || []
    const totalPages = blogPage?.totalPages || 0

    return (
        <Box>
            <Typography variant="h6" marginBottom={4}>Blogs</Typography>
            {isLoading && <BlogSkeletonGrid count={4}/>}
            {error && <Typography variant="body1">Error loading blogs</Typography>}
            {!isLoading && blogs?.length === 0 && <Typography variant="body1">No blogs found</Typography>}
            {blogs && blogs.length > 0 &&
                <Stack spacing={2}>
                    <BlogGrid blogs={blogs}/>
                    <PaginationBar page={page} count={totalPages} onPageChange={setPage} sx={{alignSelf: "center"}}/>
                </Stack>
            }
        </Box>
    )
}


export default ProfilePage;
