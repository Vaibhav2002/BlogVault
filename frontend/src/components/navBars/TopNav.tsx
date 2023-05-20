import React, {useMemo, useState} from 'react';
import {AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar} from "@mui/material";
import {NavOptions, navOptions} from "@/components/navBars/NavOptions";
import {MdMenu} from "react-icons/md";
import {useRouter} from "next/router";
import User from "@/data/models/User";
import Link from "next/link";
import {getUserRoute} from "@/utils/Routes";
import brandName from '@/../public/brand_name.png'
import Image from "next/image";

interface AppBarProps {
    user?: User | null
    onLoginClick: () => void
    onLogoutClick: () => void
    className?: string
}

const TopNav = ({user, onLoginClick, onLogoutClick, className}: AppBarProps) => {

    const router = useRouter()
    const [anchor, setAnchor] = useState<HTMLElement | null>(null)

    const onMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(event.currentTarget)
    }

    const closeMenu = () => setAnchor(null)

    const onNavOptionClick = async (option: NavOptions) => {
        closeMenu()
        await router.push(option.href)
    }

    const onLogoutPress = () => {
        closeMenu()
        onLogoutClick()
    }

    const menuItems = useMemo(() => {
        const options = navOptions.map(option =>
            <MenuItem onClick={() => onNavOptionClick(option)}>{option.screen}</MenuItem>)

        if (!user) return options
        return [...options, <MenuItem onClick={onLogoutPress}>Logout</MenuItem>]
    }, [])

    const menu = <div>
        <IconButton
            onClick={onMenuClick}
            aria-controls="menu-appbar"
            aria-haspopup="true"
        >
            <MdMenu/>
        </IconButton>
        <Menu
            anchorEl={anchor}
            onClose={closeMenu}
            open={!!anchor}
            anchorOrigin={{vertical: 'top', horizontal: 'left'}}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'left'}}
        >
            {menuItems}
        </Menu>
    </div>

    return (
        <AppBar
            position="static"
            className={className}
            sx={{backgroundColor: "background.paper"}}
            variant="outlined"
        >
            <Toolbar>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{overflowX: "hidden", width: "100%"}}
                >
                    {menu}

                    <Box position='relative' height='3rem' sx={{aspectRatio: '2.85/1'}}>
                        <Image src={brandName} fill priority alt='Brand Name'/>
                    </Box>

                    {user ? LoggedInView(user) : LoggedOutView(onLoginClick)}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

const LoggedInView = (user: User) => {
    return <Avatar src={user.profilePicUrl} sx={{cursor: "pointer"}} component={Link}
                   href={user.username ? getUserRoute(user.username) : '/'}/>
}

const LoggedOutView = (onLoginClick: () => void) => {
    return <Button variant="text" onClick={onLoginClick}>Login</Button>
}

export default TopNav;
