export enum NavScreen {
    Home = "Home",
    Discover = "Discover",
    Bookmarks = "Bookmarks",
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
        href: "/home"
    },
    {
        screen: NavScreen.Discover,
        href: "/discover"
    },
    {
        screen: NavScreen.Bookmarks,
        href: "/saved-for-later"
    },
    {
        screen: NavScreen.Search,
        href: "/search"
    },
    {
        screen: NavScreen.Post,
        href: '/blogs/create'
    }
]