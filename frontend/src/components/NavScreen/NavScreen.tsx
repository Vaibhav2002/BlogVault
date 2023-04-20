import React, {useState} from 'react';
import {Box, Stack, Theme, useMediaQuery} from "@mui/material";
import SideNav from "@/components/navBars/SideNav";
import styles from "./NavScreen.module.css";
import TopNav from "@/components/navBars/TopNav";
import useAuthModal from "@/hooks/UseAuthModal";
import AuthModal from "@/components/modals/auth/AuthModal";

interface SideNavScreenProps {
    selected: number
    children: React.ReactNode
    className?: string
}

const NavScreen = ({selected, children, className}: SideNavScreenProps) => {

    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const [auth, showAuth] = useState(false);

    return (
        <Stack
            className={`${styles.root} ${className}`}
            direction={isBelowSm ? "column" : "row"}
        >

            {isBelowSm
                ? <TopNav onLoginClick={() => showAuth(true)}/>
                : <SideNav selected={selected} className={styles.sideNav}/>
            }

            <Box className={styles.content}>{children}</Box>

            {auth && <AuthModal onDismiss={() => showAuth(false)}/>}

        </Stack>
    )
}

export default NavScreen;
