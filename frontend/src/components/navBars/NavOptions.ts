import {ReactNode} from "react";
import {CiHome} from "react-icons/ci";

export enum NavScreen {
    Home = "Home",
    Discover = "Discover",
    Bookmarks = "Bookmarks",
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
        href: "/bookmarks"
    },
    {
        screen: NavScreen.Post,
        href: '/blogs/create'
    }
]