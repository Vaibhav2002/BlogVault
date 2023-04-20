import React, {useMemo, useState} from 'react';
import {AppBar, IconButton, Menu, MenuItem, Stack, Toolbar, Typography} from "@mui/material";
import {NavOptions, navOptions} from "@/components/navBars/NavOptions";
import {MdMenu} from "react-icons/md";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {useRouter} from "next/router";

interface AppBarProps {
    onLoginClick: () => void
    className?: string
}

const TopNav = ({onLoginClick, className}: AppBarProps) => {

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

    const menuItems = useMemo(() => (
        navOptions.map(option =>
            <MenuItem onClick={() => onNavOptionClick(option)}>{option.name}</MenuItem>)
    ), [])


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
                    <Typography variant="h6" color="text.primary">BlogVault</Typography>
                    <PrimaryButton variant="text" onClick={onLoginClick}>Login</PrimaryButton>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default TopNav;
