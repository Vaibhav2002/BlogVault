import React, {ReactElement, useMemo, useState} from 'react';
import {Avatar, Stack, StackProps} from "@mui/material";
import ContainedIcon from "@/components/ContainedIcon";
import {CiBookmark, CiGrid42, CiHome, CiLogin, CiLogout, CiSquarePlus} from "react-icons/ci";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import {NavOptions, navOptions} from "@/components/navBars/NavOptions";
import User from "@/data/models/User";

const iconSize = 24

const getIconColor = (isSelected: Boolean) => isSelected ? "white" : "black"

const getIconBgColor = (isSelected: Boolean) => isSelected ? "primary.main" : "background"

const getIconForNavItem = (option: NavOptions, selected: boolean) => {
    switch (option.name) {
        case "Home":
            return <CiHome size={iconSize} color={getIconColor(selected)}/>
        case "Discover":
            return <CiGrid42 size={iconSize} color={getIconColor(selected)}/>
        case "Bookmarks":
            return <CiBookmark size={iconSize} color={getIconColor(selected)}/>
        case "Post":
            return <CiSquarePlus size={iconSize} color={getIconColor(selected)}/>
    }
}

interface SideNavItems {
    navItem: NavOptions
    icon: ReactElement
}

interface SideNavProps {
    user?: User
    selected: number
    className: string
    onLoginClick: () => void
    onLogoutClick: () => void
}


const getContainedIcon = (icon: ReactElement, bgColor: string, onClick: () => void, key?: number) =>
    <ContainedIcon
        key={key}
        icon={icon}
        onClick={onClick}
        sx={{backgroundColor: bgColor, cursor: "pointer"}}
        component={motion.div}
        whileHover={{scale: 1.3}}
    />

const SideNav = ({user, selected = 0, className, onLoginClick, onLogoutClick, ...props}: SideNavProps & StackProps) => {

    const [selectedIndex, setSelectedIndex] = useState(selected)

    const navItems = useMemo(() => navOptions.map((option, index) => (
        {
            navItem: option,
            icon: getIconForNavItem(option, selectedIndex === index)
        } as SideNavItems
    )), [selectedIndex])

    const router = useRouter()

    const onIconSelected = (index: number) => {
        setSelectedIndex(index)
        router.push(navItems[index].navItem.href)
    }

    return (
        <Stack spacing={4} className={className} padding={3} {...props}>

            {navItems.map((item, index) => (
                getContainedIcon(
                    item.icon,
                    getIconBgColor(selectedIndex === index),
                    () => onIconSelected(index),
                    index
                )))
            }
            {user ? userLoggedInView(user, onLogoutClick) : userLoggedOutView(onLoginClick)}
        </Stack>
    )
}

const userLoggedInView = (user: User, onLogoutClick: () => void) => {
    return (
        <>
            <Avatar
                src={user.profilePicUrl}
                sx={{cursor: "pointer"}}
                component={motion.div}
                whileHover={{scale: 1.3}}
            />
            {
                getContainedIcon(
                    <CiLogout size={iconSize} color={getIconColor(false)}/>,
                    getIconBgColor(false),
                    onLogoutClick
                )
            }
        </>
    )
}

const userLoggedOutView = (onLoginClick: () => void) => {
    return (
        getContainedIcon(
            <CiLogin size={iconSize} color={getIconColor(false)}/>,
            getIconBgColor(false),
            onLoginClick
        )
    )
}


export default SideNav;
