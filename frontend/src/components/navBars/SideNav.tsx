import React, {ReactElement, useMemo} from 'react';
import {Stack, StackProps, Tooltip} from "@mui/material";
import ContainedIcon from "@/components/ContainedIcon";
import {CiBookmark, CiGrid42, CiHome, CiLogin, CiLogout, CiSquarePlus} from "react-icons/ci";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import {NavOptions, navOptions, NavScreen} from "@/components/navBars/NavOptions";
import User from "@/data/models/User";
import UserAvatar from "@/components/Avatar";
import Link from "next/link";
import {getUserRoute} from "@/utils/Routes";

const iconSize = 24

const getIconColor = (isSelected: Boolean) => isSelected ? "white" : "black"

const getIconBgColor = (isSelected: Boolean) => isSelected ? "secondary.main" : "background"

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
    selected?: NavScreen
    className: string
    onLoginClick: () => void
    onLogoutClick: () => void
}

const SideNav = ({user, selected, className, onLoginClick, onLogoutClick, ...props}: SideNavProps & StackProps) => {

    const navItems = useMemo(() => navOptions.map((option) => (
        {
            navItem: option,
            icon: getIconForNavItem(option, selected === option.screen)
        } as SideNavItem
    )), [selected])

    const router = useRouter()

    const onIconSelected = async (item: SideNavItem) => {
        if (item.navItem.screen != NavScreen.Post || user)
            await router.push(item.navItem.href)
        else onLoginClick()
    }

    return (
        <Stack spacing={4} className={className} padding={3} {...props}>

            {navItems.map((item) =>
                <SideNavIcon
                    key={item.navItem.href}
                    icon={item.icon}
                    bgColor={getIconBgColor(selected === item.navItem.screen)}
                    text={item.navItem.screen}
                    onClick={() => onIconSelected(item)}
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
                <Link href={getUserRoute(user.username ?? 'User')} passHref>
                    <UserAvatar
                        url={user.profilePicUrl}
                        sx={{cursor: "pointer"}}
                        component={motion.div}
                        whileHover={{scale: 1.3}}
                    />
                </Link>
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
