import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import {getScreenFromRoute} from "@/utils/TrackerConfig";
import {useRouter} from "next/router";
import * as tracker from "@/utils/Tracker";
import Topic from "@/data/models/Topic";
import Blog from "@/data/models/Blog";
import User from "@/data/models/User";
import {useEffect} from "react";

export default function useTracker() {
    const router = useRouter()
    const {user} = useAuthenticatedUser()
    const screen = getScreenFromRoute(router.pathname)

    return {
        onLand: () => tracker.landed(screen, user),
        loginModalOpen: () => tracker.loginModalOpen(screen, user),
        login: () => tracker.login(screen, user),
        registerModalOpen: () => tracker.registerModalOpen(screen, user),
        emailVerificationCodeRequest: () => tracker.emailVerificationCodeRequest(screen, user),
        register: () => tracker.register,
        resetPasswordModalOpen: () => tracker.resetPasswordModalOpen(screen, user),
        resetPasswordVerificationCodeRequest: () => tracker.resetPasswordVerificationCodeRequest(screen, user),
        resetPassword: () => tracker.passwordReset(screen, user),
        logout: () => tracker.logout(screen, user),
        editProfileModalOpen: () => tracker.editProfileModalOpen(screen, user),
        editProfile: () => tracker.editProfile(screen, user),
        createTopicModalOpen: () => tracker.createTopicModalOpen(screen, user),
        createTopic: () => tracker.topicCreate(screen, user),
        usernameModalOpen: () => tracker.usernameModalOpen(screen, user),
        blogCardClick: (blog: Blog) => tracker.blogCardClick(blog, screen, user),
        topicChipClick: (topic: Topic) => tracker.topicChipClick(topic, screen, user),
        trendingTopicChipClick: (topic: Topic) => tracker.trendingTopicChipClick(topic, screen, user),
        trendingBlogCardClick: (blog: Blog) => tracker.trendingBlogClick(blog, screen, user),
        blogAuthorAvatarClick: (blog: Blog) => tracker.blogAuthorAvatarClick(blog, screen, user),
        trendingBlogAuthorAvatarClick: (blog: Blog) => tracker.trendingBlogAuthorAvatarClick(blog, screen, user),
        authorTrendingCardClick: (author: User) => tracker.trendingAuthorClick(author, screen, user),
        blogSaveFromCard: (blog: Blog) => tracker.blogSaveFromCard(blog, screen, user),
        blogSaveFromScreen: (blog: Blog) => tracker.blogSaveFromScreen(blog, screen, user),
        blogUnSaveFromCard: (blog: Blog) => tracker.blogUnSaveFromCard(blog, screen, user),
        blogUnSaveFromScreen: (blog: Blog) => tracker.blogUnSaveFromScreen(blog, screen, user),
        blogCreate: (blog: Blog) => tracker.blogCreate(blog, screen, user),
        blogEdit: (blog: Blog) => tracker.blogEdit(blog, screen, user),
        blogDelete: (blog: Blog) => tracker.blogDelete(blog, screen, user),
        search: (searchQuery: string) => tracker.search(searchQuery, screen, user),
    }
}

export const useLandedEvent = () => {
    const {onLand} = useTracker()
    useEffect(() => {
        onLand()
    }, [])
}