import Route from "@/utils/Routes";

export enum NavScreen {
    Home = "Home",
    Discover = "Discover",
    SavedBlogs = "Saved blogs",
    Search = "Search",
    Post = "Post"
}

export interface NavOptions {
    screen: NavScreen;
    href: string
}


export const navOptions: NavOptions[] = [
    {
        screen: NavScreen.Home,
        href: Route.Home
    },
    {
        screen: NavScreen.Discover,
        href: Route.Discover
    },
    {
        screen: NavScreen.SavedBlogs,
        href: Route.SavedForLater
    },
    {
        screen: NavScreen.Search,
        href: Route.Search
    },
    {
        screen: NavScreen.Post,
        href: Route.Post
    }
]