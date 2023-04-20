import React, {useState} from 'react';
import {Box, Stack, Theme, useMediaQuery} from "@mui/material";
import SideNav from "@/components/navBars/SideNav";
import styles from "./NavScreen.module.css";
import TopNav from "@/components/navBars/TopNav";
import LoginModal from "@/components/modals/auth/LoginModal";
import RegisterModal from "@/components/modals/auth/RegisterModal";

interface SideNavScreenProps {
    selected: number
    children: React.ReactNode
    className?: string
}

const NavScreen = ({selected, children, className}: SideNavScreenProps) => {

    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const onLoginClick = () => setShowLogin(true)
    const closeLogin = () => setShowLogin(false)
    const onRegisterClick = () => setShowRegister(true)
    const closeRegister = () => setShowRegister(false)
    const onMovieToLogin = () => {
        closeRegister()
        onLoginClick()
    }
    const onMoveToRegister = () => {
        closeLogin()
        onRegisterClick()
    }

    return (
        <Stack
            className={`${styles.root} ${className}`}
            direction={isBelowSm ? "column" : "row"}
        >

            {isBelowSm
                ? <TopNav onLoginClick={onLoginClick}/>
                : <SideNav selected={selected} className={styles.sideNav}/>
            }

            <Box className={styles.content}>{children}</Box>

            {showLogin && <LoginModal onDismiss={closeLogin} onMoveToRegister={onMoveToRegister}/>}
            {showRegister && <RegisterModal onDismiss={closeRegister} onMoveToLogin={onMovieToLogin}/>}

        </Stack>
    )
}

export default NavScreen;
