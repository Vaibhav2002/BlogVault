import {ReactNode} from "react";
import {CiHome} from "react-icons/ci";

export interface NavOptions {
    name: string;
    href: string
}


export const navOptions: NavOptions[] = [
    {
        name: "Home",
        href: "/home"
    },
    {
        name: "Discover",
        href: "/discover"
    },
    {
        name: "Bookmarks",
        href: "/bookmarks"
    },
    {
        name:'Post',
        href: '/blogs/create'
    }
]