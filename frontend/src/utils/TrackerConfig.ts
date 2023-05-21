import User from "@/data/models/User";
import Blog from "@/data/models/Blog";
import Topic from "@/data/models/Topic";
import {analytics} from "@/utils/FirebaseConfig";
import {logEvent} from "@firebase/analytics";
import Route, {getRouteFromString} from "@/utils/Routes";

export enum TrackingEvent {
    LANDED = 'landed',
    LOGIN = 'login',
    LOGOUT = 'logout',
    REGISTER = 'register',
    REQUEST_EMAIL_VERIFICATION_CODE = 'request_email_verification_code',
    REQUEST_RESET_PASSWORD_CODE = 'request_reset_password_code',
    RESET_PASSWORD = 'reset_password',
    CLICK = 'click',
    SEARCH = 'search',
    EDIT_PROFILE = 'edit_profile',
    EDIT_BLOG = 'edit_blog',
    CREATE_BLOG = 'create_blog',
    DELETE_BLOG = 'delete_blog',
    CREATE_TOPIC = 'create_topic',
    SAVE_BLOG = 'save_blog',
    UN_SAVE_BLOG = 'un_save_blog',
}

export enum TrackingScreen {
    HOME = 'home',
    DISCOVER = 'discover',
    SAVED = 'saved',
    PROFILE = 'profile',
    SEARCH = 'search',
    BLOG = 'blog',
    EDIT_BLOG = 'edit_blog',
    CREATE_BLOG = 'create_blog',
}

export enum TrackingLocation {
    LOGIN_MODAL = 'login_modal',
    REGISTER_MODAL = 'register_modal',
    RESET_PASSWORD_MODAL = 'reset_password_modal',
    EDIT_PROFILE_MODAL = 'edit_profile_modal',
    CREATE_TOPIC_MODAL = 'create_topic_modal',
    USERNAME_MODAL = 'username_modal',
    BLOG_CARD = 'blog_card',
    TOPIC_CHIP = 'topic_chip',
    TRENDING_TOPIC_CHIP = 'trending_topic_chip',
    TRENDING_BLOG_CARD = 'trending_blog_card',
    AUTHOR_AVATAR = 'author_avatar',
    AUTHOR_TRENDING_CARD = 'author_trending_card'
}

export interface TrackingData {
    event: string;
    screen: string,
    location?: string,
    currentUser?: User | null,
    blog?: Blog,
    author?: User,
    topic?: Topic,
    searchQuery?: string
}

export const getScreenFromRoute = (routeStr: string): TrackingScreen => {
    const route = getRouteFromString(routeStr)
    switch (route) {
        case Route.Home:
            return TrackingScreen.HOME
        case Route.Discover:
            return TrackingScreen.DISCOVER
        case Route.SavedForLater:
            return TrackingScreen.SAVED
        case Route.Users:
            return TrackingScreen.PROFILE
        case Route.Search:
            return TrackingScreen.SEARCH
        case Route.Blog:
            return TrackingScreen.BLOG
        case Route.Edit:
            return TrackingScreen.EDIT_BLOG
        case Route.Post:
            return TrackingScreen.CREATE_BLOG
        default:
            return TrackingScreen.HOME
    }
}

export default function track(data: TrackingData) {
    try {
        if (process.env.NODE_ENV !== 'production') return;
        const appAnalytics = analytics()
        if (!appAnalytics) return
        logEvent(appAnalytics, data.event, {
            screen: data.screen,
            ...(data.location && {location: data.location}),
            ...(data.blog && {blogId: data.blog?._id}),
            ...(data.blog && {blogTitle: data.blog?.title}),
            ...(data.author && {authorId: data.author?._id}),
            ...(data.author && {authorUsername: data.author?.username}),
            ...(data.topic && {topicId: data.topic?._id}),
            ...(data.topic && {topicName: data.topic?.name}),
            ...(data.searchQuery && {searchQuery: data.searchQuery}),
            ...(data.currentUser && {currentUserId: data.currentUser?._id}),
            ...(data.currentUser && {currentUsername: data.currentUser?.username}),
        })
    } catch (e) {
        console.log(e)
    }
}