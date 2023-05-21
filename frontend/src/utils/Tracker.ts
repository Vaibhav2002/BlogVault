import track, {TrackingEvent, TrackingLocation, TrackingScreen} from "@/utils/TrackerConfig";
import User from "@/data/models/User";
import Blog from "@/data/models/Blog";
import Topic from "@/data/models/Topic";


export const landed = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.LANDED,
        screen: screen,
        currentUser: user
    })
}

export const loginModalOpen = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.LANDED,
        screen: screen,
        location: TrackingLocation.LOGIN_MODAL,
        currentUser: user
    })
}

export const login = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.LOGIN,
        screen: screen,
        location: TrackingLocation.LOGIN_MODAL,
        currentUser: user
    })
}

export const registerModalOpen = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.LANDED,
        screen: screen,
        location: TrackingLocation.REGISTER_MODAL,
        currentUser: user
    })
}

export const emailVerificationCodeRequest = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.REQUEST_EMAIL_VERIFICATION_CODE,
        screen: screen,
        location: TrackingLocation.LOGIN_MODAL,
        currentUser: user
    })
}

export const register = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.REGISTER,
        screen: screen,
        location: TrackingLocation.REGISTER_MODAL,
        currentUser: user
    })
}

export const resetPasswordModalOpen = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.LANDED,
        screen: screen,
        location: TrackingLocation.RESET_PASSWORD_MODAL,
        currentUser: user
    })
}

export const resetPasswordVerificationCodeRequest = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.REQUEST_RESET_PASSWORD_CODE,
        screen: screen,
        location: TrackingLocation.RESET_PASSWORD_MODAL,
        currentUser: user
    })
}

export const passwordReset = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.RESET_PASSWORD,
        screen: screen,
        location: TrackingLocation.RESET_PASSWORD_MODAL,
        currentUser: user
    })
}

export const logout = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.LOGOUT,
        screen: screen,
        currentUser: user
    })
}

export const editProfileModalOpen = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.LANDED,
        screen: screen,
        location: TrackingLocation.EDIT_PROFILE_MODAL,
        currentUser: user
    })
}

export const editProfile = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.EDIT_PROFILE,
        screen: screen,
        location: TrackingLocation.EDIT_PROFILE_MODAL,
        currentUser: user
    })
}

export const createTopicModalOpen = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.LANDED,
        screen: screen,
        location: TrackingLocation.CREATE_TOPIC_MODAL,
        currentUser: user
    })
}

export const topicCreate = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.CREATE_TOPIC,
        screen: screen,
        location: TrackingLocation.CREATE_TOPIC_MODAL,
        currentUser: user
    })
}

export const usernameModalOpen = (screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.LANDED,
        screen: screen,
        location: TrackingLocation.USERNAME_MODAL,
        currentUser: user
    })
}

export const blogCardClick = (blog: Blog, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.CLICK,
        screen: screen,
        location: TrackingLocation.BLOG_CARD,
        currentUser: user,
        blog: blog
    })
}

export const trendingBlogClick = (blog: Blog, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.CLICK,
        screen: screen,
        location: TrackingLocation.TRENDING_BLOG_CARD,
        currentUser: user,
        blog: blog
    })
}

export const blogSaveFromCard = (blog: Blog, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.SAVE_BLOG,
        screen: screen,
        location: TrackingLocation.BLOG_CARD,
        currentUser: user,
        blog: blog
    })
}

export const blogSaveFromTrendingCard = (blog: Blog, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.SAVE_BLOG,
        screen: screen,
        location: TrackingLocation.TRENDING_BLOG_CARD,
        currentUser: user,
        blog: blog
    })
}

export const blogSaveFromScreen = (blog: Blog, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.SAVE_BLOG,
        screen: screen,
        currentUser: user,
        blog: blog
    })
}

export const blogUnSaveFromCard = (blog: Blog, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.UN_SAVE_BLOG,
        screen: screen,
        location: TrackingLocation.BLOG_CARD,
        currentUser: user,
        blog: blog
    })
}

export const blogUnSaveFromTrendingCard = (blog: Blog, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.UN_SAVE_BLOG,
        screen: screen,
        location: TrackingLocation.TRENDING_BLOG_CARD,
        currentUser: user,
        blog: blog
    })
}

export const blogUnSaveFromScreen = (blog: Blog, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.UN_SAVE_BLOG,
        screen: screen,
        currentUser: user,
        blog: blog
    })
}

export const topicChipClick = (topic: Topic, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.CLICK,
        screen: screen,
        location: TrackingLocation.TOPIC_CHIP,
        currentUser: user,
        topic: topic
    })
}

export const trendingTopicChipClick = (topic: Topic, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.CLICK,
        screen: screen,
        location: TrackingLocation.TRENDING_TOPIC_CHIP,
        currentUser: user,
        topic: topic
    })
}

export const blogAuthorAvatarClick = (blog: Blog, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.CLICK,
        screen: screen,
        location: TrackingLocation.AUTHOR_AVATAR,
        currentUser: user,
        blog: blog,
        author: blog.author
    })
}

export const trendingBlogAuthorAvatarClick = (blog: Blog, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.CLICK,
        screen: screen,
        location: TrackingLocation.TRENDING_BLOG_CARD,
        currentUser: user,
        blog: blog,
    })
}

export const trendingAuthorClick = (author: User, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.CLICK,
        screen: screen,
        location: TrackingLocation.AUTHOR_TRENDING_CARD,
        currentUser: user,
        author: author,
    })
}

export const blogCreate = (blog: Blog, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.CREATE_BLOG,
        screen: screen,
        currentUser: user,
        blog: blog
    })
}

export const blogEdit = (blog: Blog, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.EDIT_BLOG,
        screen: screen,
        currentUser: user,
        blog: blog
    })
}

export const blogDelete = (blog: Blog, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.DELETE_BLOG,
        screen: screen,
        currentUser: user,
        blog: blog
    })
}

export const search = (searchQuery: string, screen: TrackingScreen, user?: User | null) => {
    track({
        event: TrackingEvent.SEARCH,
        screen: screen,
        currentUser: user,
        searchQuery: searchQuery
    })
}