import React, {ReactElement, useMemo} from 'react';
import {Box, Stack, StackProps, Tooltip} from "@mui/material";
import ContainedIcon from "@/components/ContainedIcon";
import {CiBookmark, CiGrid42, CiHome, CiLogin, CiLogout, CiSearch, CiSquarePlus} from "react-icons/ci";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import {NavOptions, navOptions, NavScreen} from "@/components/navBars/NavOptions";
import User from "@/data/models/User";
import UserAvatar from "@/components/Avatar";
import Link from "next/link";
import Routes, {getUserRoute} from "@/utils/Routes";
import Image from "next/image";
import logo from '@/assets/images/logo.png'
import CenteredBox from "@/components/styled/CenteredBox";

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
        case NavScreen.Search:
            return <CiSearch size={iconSize} color={getIconColor(selected)}/>
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
        <CenteredBox
            flexDirection='column'
            gap={4}
            className={className}
            padding={3}
            {...props}
            height='100%'
            position='relative'
        >

            <Box
                sx={{
                    position: 'absolute', top: 0, left: 0, aspectRatio: '1/1', overflow: 'hidden', padding: 3
                }}
                width={1}
                component={Link}
                href={Routes.Home}
            >
                <Box width={1} sx={{aspectRatio: '1/1', position: 'relative'}}>
                    <Image src={logo} fill priority alt='Logo'/>
                </Box>
            </Box>


            <Stack spacing={4} justifySelf='center'>
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

        </CenteredBox>
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
        <motion.div whileHover={{scale: '1.3'}}>
            <ContainedIcon
                title={text}
                icon={icon}
                onClick={onClick}
                sx={{backgroundColor: bgColor, cursor: "pointer"}}
            />
        </motion.div>
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
                    <motion.div whileHover={{scale: 1.3}}>
                        <UserAvatar url={user.profilePicUrl} sx={{cursor: "pointer"}}/>
                    </motion.div>
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
