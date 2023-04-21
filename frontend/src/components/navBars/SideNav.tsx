import React, {ReactElement, useMemo, useState} from 'react';
import {Avatar, Stack, StackProps, Tooltip} from "@mui/material";
import ContainedIcon from "@/components/ContainedIcon";
import {CiBookmark, CiGrid42, CiHome, CiLogin, CiLogout, CiSquarePlus} from "react-icons/ci";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import {NavOptions, navOptions, NavScreen} from "@/components/navBars/NavOptions";
import User from "@/data/models/User";

const iconSize = 24

const getIconColor = (isSelected: Boolean) => isSelected ? "white" : "black"

const getIconBgColor = (isSelected: Boolean) => isSelected ? "primary.main" : "background"

const getIconForNavItem = (option: NavOptions, selected: boolean) => {
    switch (option.screen) {
        case NavScreen.Home:
            return <CiHome size={iconSize} color={getIconColor(selected)}/>
        case NavScreen.Discover:
            return <CiGrid42 size={iconSize} color={getIconColor(selected)}/>
        case NavScreen.Bookmarks:
            return <CiBookmark size={iconSize} color={getIconColor(selected)}/>
        case NavScreen.Post:
            return <CiSquarePlus size={iconSize} color={getIconColor(selected)}/>
    }
}

interface SideNavItem {
    navItem: NavOptions
    icon: ReactElement
}

interface SideNavProps {
    user?: User | null
    selected: number
    className: string
    onLoginClick: () => void
    onLogoutClick: () => void
}

const SideNav = ({user, selected = 0, className, onLoginClick, onLogoutClick, ...props}: SideNavProps & StackProps) => {

    const navItems = useMemo(() => navOptions.map((option, index) => (
        {
            navItem: option,
            icon: getIconForNavItem(option, selected === index)
        } as SideNavItem
    )), [selected])

    const router = useRouter()

    const onIconSelected = async (item:SideNavItem, index:number) => {
        if(item.navItem.screen != NavScreen.Post || user)
            await router.push(item.navItem.href)
        else onLoginClick()
    }

    return (
        <Stack spacing={4} className={className} padding={3} {...props}>

            {navItems.map((item, index) =>
                <SideNavIcon
                    key={index}
                    icon={item.icon}
                    bgColor={getIconBgColor(selected === index)}
                    text={item.navItem.screen}
                    onClick={() => onIconSelected(item, index)}
                />
            )}

            {user
                ? <UserLoggedInView user={user} onLogoutClick={onLogoutClick}/>
                : <UserLoggedOutView onLoginClick={onLoginClick}/>
            }
        </Stack>
    )
}

interface SideNavIconsProps {
    text: string
    icon: ReactElement
    bgColor: string
    onClick: () => void
}

const SideNavIcon = ({text, icon, bgColor, onClick}: SideNavIconsProps) => {
    return (
        <ContainedIcon
            title={text}
            icon={icon}
            onClick={onClick}
            sx={{backgroundColor: bgColor, cursor: "pointer"}}
            component={motion.div}
            whileHover={{scale: 1.3}}
        />
    )
}


interface LoggedInViewProps {
    user: User
    onLogoutClick: () => void
}

const UserLoggedInView = ({user, onLogoutClick}: LoggedInViewProps) => {
    return (
        <>
            <Tooltip title="Profile" enterDelay={500}>
                <Avatar
                    src={user.profilePicUrl}
                    sx={{cursor: "pointer"}}
                    component={motion.div}
                    whileHover={{scale: 1.3}}
                />
            </Tooltip>

            <SideNavIcon
                text="Logout"
                icon={<CiLogout size={iconSize} color={getIconColor(false)}/>}
                bgColor={getIconBgColor(false)}
                onClick={onLogoutClick}
            />
        </>
    )
}

interface LoggedOutViewProps {
    onLoginClick: () => void
}

const UserLoggedOutView = ({onLoginClick}: LoggedOutViewProps) => {
    return (
        <SideNavIcon
            text="Login"
            icon={<CiLogin size={iconSize} color={getIconColor(false)}/>}
            bgColor={getIconBgColor(false)}
            onClick={onLoginClick}
        />
    )
}


export default SideNav;
