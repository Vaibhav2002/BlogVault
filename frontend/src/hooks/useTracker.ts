import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import {getScreenFromRoute} from "@/utils/TrackerConfig";
import {useRouter} from "next/router";
import Tracker from "@/utils/Tracker";
import Topic from "@/data/models/Topic";
import Blog from "@/data/models/Blog";
import User from "@/data/models/User";

export default function useTracker() {
    const router = useRouter()
    const {user} = useAuthenticatedUser()
    const tracker = new Tracker(user, getScreenFromRoute(router.pathname))

    return {
        loginModalOpen: tracker.loginModalOpen,
        login: tracker.login,
        registerModalOpen: tracker.registerModalOpen,
        emailVerificationCodeRequest: tracker.emailVerificationCodeRequest,
        register: tracker.register,
        resetPasswordModalOpen: tracker.resetPasswordModalOpen,
        resetPasswordVerificationCodeRequest: tracker.resetPasswordVerificationCodeRequest,
        resetPassword: tracker.passwordReset,
        logout: tracker.logout,
        editProfileModalOpen: tracker.editProfileModalOpen,
        editProfile: tracker.editProfile,
        createTopicModalOpen: tracker.createTopicModalOpen,
        createTopic: tracker.topicCreate,
        usernameModalOpen: tracker.usernameModalOpen,
        blogCardClick: (blog: Blog) => tracker.blogCardClick(blog),
        topicChipClick: (topic: Topic) => tracker.topicChipClick(topic),
        trendingTopicChipClick: (topic: Topic) => tracker.trendingTopicChipClick(topic),
        trendingBlogCardClick: (blog: Blog) => tracker.trendingBlogClick(blog),
        blogAuthorAvatarClick: (blog: Blog) => tracker.blogAuthorAvatarClick(blog),
        trendingBlogAuthorAvatarClick: (blog: Blog) => tracker.trendingBlogAuthorAvatarClick(blog),
        authorTrendingCardClick: (author: User) => tracker.trendingAuthorClick(author),
        blogSaveFromCard: (blog: Blog) => tracker.blogSaveFromCard(blog),
        blogSaveFromScreen: (blog: Blog) => tracker.blogSaveFromScreen(blog),
        blogUnSaveFromCard: (blog: Blog) => tracker.blogUnSaveFromCard(blog),
        blogUnSaveFromScreen: (blog: Blog) => tracker.blogUnSaveFromScreen(blog),
        blogCreate: (blog: Blog) => tracker.blogCreate(blog),
        blogEdit: (blog: Blog) => tracker.blogEdit(blog),
        blogDelete: (blog: Blog) => tracker.blogDelete(blog),
        search: (searchQuery: string) => tracker.search(searchQuery),
    }


}