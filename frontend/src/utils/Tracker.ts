import track, {TrackingEvent, TrackingLocation, TrackingScreen} from "@/utils/TrackerConfig";
import User from "@/data/models/User";
import Blog from "@/data/models/Blog";
import Topic from "@/data/models/Topic";

export default class Tracker {
    user?: User | null
    screen: TrackingScreen

    constructor(user: User | null | undefined, screen: TrackingScreen) {
        this.user = user
        this.screen = screen
    }

    loginModalOpen() {
        track({
            event: TrackingEvent.LANDED,
            screen: this.screen,
            location: TrackingLocation.LOGIN_MODAL,
            currentUser: this.user
        })
    }

    login() {
        track({
            event: TrackingEvent.LOGIN,
            screen: this.screen,
            location: TrackingLocation.LOGIN_MODAL,
            currentUser: this.user
        })
    }

    registerModalOpen() {
        track({
            event: TrackingEvent.LANDED,
            screen: this.screen,
            location: TrackingLocation.REGISTER_MODAL,
            currentUser: this.user
        })
    }

    emailVerificationCodeRequest() {
        track({
            event: TrackingEvent.REQUEST_EMAIL_VERIFICATION_CODE,
            screen: this.screen,
            location: TrackingLocation.LOGIN_MODAL,
            currentUser: this.user
        })
    }

    register() {
        track({
            event: TrackingEvent.REGISTER,
            screen: this.screen,
            location: TrackingLocation.REGISTER_MODAL,
            currentUser: this.user
        })
    }

    resetPasswordModalOpen() {
        track({
            event: TrackingEvent.LANDED,
            screen: this.screen,
            location: TrackingLocation.RESET_PASSWORD_MODAL,
            currentUser: this.user
        })
    }

    resetPasswordVerificationCodeRequest() {
        track({
            event: TrackingEvent.REQUEST_RESET_PASSWORD_CODE,
            screen: this.screen,
            location: TrackingLocation.RESET_PASSWORD_MODAL,
            currentUser: this.user
        })
    }

    passwordReset() {
        track({
            event: TrackingEvent.RESET_PASSWORD,
            screen: this.screen,
            location: TrackingLocation.RESET_PASSWORD_MODAL,
            currentUser: this.user
        })
    }

    logout() {
        track({
            event: TrackingEvent.LOGOUT,
            screen: this.screen,
            currentUser: this.user
        })
    }

    editProfileModalOpen() {
        track({
            event: TrackingEvent.LANDED,
            screen: this.screen,
            location: TrackingLocation.EDIT_PROFILE_MODAL,
            currentUser: this.user
        })
    }

    editProfile() {
        track({
            event: TrackingEvent.EDIT_PROFILE,
            screen: this.screen,
            location: TrackingLocation.EDIT_PROFILE_MODAL,
            currentUser: this.user
        })
    }

    createTopicModalOpen() {
        track({
            event: TrackingEvent.LANDED,
            screen: this.screen,
            location: TrackingLocation.CREATE_TOPIC_MODAL,
            currentUser: this.user
        })
    }

    topicCreate() {
        track({
            event: TrackingEvent.CREATE_TOPIC,
            screen: this.screen,
            location: TrackingLocation.CREATE_TOPIC_MODAL,
            currentUser: this.user
        })
    }

    usernameModalOpen() {
        track({
            event: TrackingEvent.LANDED,
            screen: this.screen,
            location: TrackingLocation.USERNAME_MODAL,
            currentUser: this.user
        })
    }

    blogCardClick(blog: Blog) {
        track({
            event: TrackingEvent.CLICK,
            screen: this.screen,
            location: TrackingLocation.BLOG_CARD,
            currentUser: this.user,
            blog: blog
        })
    }

    trendingBlogClick(blog: Blog) {
        track({
            event: TrackingEvent.CLICK,
            screen: this.screen,
            location: TrackingLocation.TRENDING_BLOG_CARD,
            currentUser: this.user,
            blog: blog
        })
    }

    blogSaveFromCard(blog: Blog) {
        track({
            event: TrackingEvent.SAVE_BLOG,
            screen: this.screen,
            location: TrackingLocation.BLOG_CARD,
            currentUser: this.user,
            blog: blog
        })
    }

    blogSaveFromTrendingCard(blog: Blog) {
        track({
            event: TrackingEvent.SAVE_BLOG,
            screen: this.screen,
            location: TrackingLocation.TRENDING_BLOG_CARD,
            currentUser: this.user,
            blog: blog
        })
    }

    blogSaveFromScreen(blog: Blog) {
        track({
            event: TrackingEvent.SAVE_BLOG,
            screen: this.screen,
            currentUser: this.user,
            blog: blog
        })
    }

    blogUnSaveFromCard(blog: Blog) {
        track({
            event: TrackingEvent.UN_SAVE_BLOG,
            screen: this.screen,
            location: TrackingLocation.BLOG_CARD,
            currentUser: this.user,
            blog: blog
        })
    }

    blogUnSaveFromTrendingCard(blog: Blog) {
        track({
            event: TrackingEvent.UN_SAVE_BLOG,
            screen: this.screen,
            location: TrackingLocation.TRENDING_BLOG_CARD,
            currentUser: this.user,
            blog: blog
        })
    }

    blogUnSaveFromScreen(blog: Blog) {
        track({
            event: TrackingEvent.UN_SAVE_BLOG,
            screen: this.screen,
            currentUser: this.user,
            blog: blog
        })
    }

    topicChipClick(topic: Topic) {
        track({
            event: TrackingEvent.CLICK,
            screen: this.screen,
            location: TrackingLocation.TOPIC_CHIP,
            currentUser: this.user,
            topic: topic
        })
    }

    trendingTopicChipClick(topic: Topic) {
        track({
            event: TrackingEvent.CLICK,
            screen: this.screen,
            location: TrackingLocation.TRENDING_TOPIC_CHIP,
            currentUser: this.user,
            topic: topic
        })
    }

    blogAuthorAvatarClick(blog: Blog) {
        track({
            event: TrackingEvent.CLICK,
            screen: this.screen,
            location: TrackingLocation.AUTHOR_AVATAR,
            currentUser: this.user,
            blog: blog,
            author: blog.author
        })
    }

    trendingBlogAuthorAvatarClick(blog: Blog) {
        track({
            event: TrackingEvent.CLICK,
            screen: this.screen,
            location: TrackingLocation.TRENDING_BLOG_CARD,
            currentUser: this.user,
            blog: blog,
        })
    }

    trendingAuthorClick(author: User) {
        track({
            event: TrackingEvent.CLICK,
            screen: this.screen,
            location: TrackingLocation.AUTHOR_TRENDING_CARD,
            currentUser: this.user,
            author: author,
        })
    }

    blogCreate(blog: Blog) {
        track({
            event: TrackingEvent.CREATE_BLOG,
            screen: this.screen,
            currentUser: this.user,
            blog: blog
        })
    }

    blogEdit(blog: Blog) {
        track({
            event: TrackingEvent.EDIT_BLOG,
            screen: this.screen,
            currentUser: this.user,
            blog: blog
        })
    }

    blogDelete(blog: Blog) {
        track({
            event: TrackingEvent.DELETE_BLOG,
            screen: this.screen,
            currentUser: this.user,
            blog: blog
        })
    }

    search(searchQuery: string) {
        track({
            event: TrackingEvent.SEARCH,
            screen: this.screen,
            currentUser: this.user,
            searchQuery: searchQuery
        })
    }
}