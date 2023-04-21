import React, {useState} from 'react';
import {Box, Stack, Theme, useMediaQuery} from "@mui/material";
import SideNav from "@/components/navBars/SideNav";
import styles from "./NavScreen.module.css";
import TopNav from "@/components/navBars/TopNav";
import AuthModal from "@/components/modals/auth/AuthModal";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import {logoutUser} from "@/data/dataSources/AuthDataSource";

interface SideNavScreenProps {
    selected: number
    children: React.ReactNode
    className?: string
}

const NavScreen = ({selected, children, className}: SideNavScreenProps) => {

    const {user, mutateUser} = useAuthenticatedUser()

    const isBelowSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const [auth, showAuth] = useState(false);

    const logout = async () => {
        try {
            await logoutUser()
            await mutateUser(null)
        } catch (e) {
            if (e instanceof Error)
                alert(e.message)
            console.log(e)
        }
    }

    return (
        <Stack
            className={`${styles.root} ${className}`}
            direction={isBelowSm ? "column" : "row"}
        >

            {isBelowSm
                ? <TopNav user={user} onLoginClick={() => showAuth(true)} onLogoutClick={logout}/>
                : <SideNav
                    user={user}
                    selected={selected}
                    className={styles.sideNav}
                    onLoginClick={() => showAuth(true)}
                    onLogoutClick={logout}
                />
            }

            <Box className={styles.content}>{children}</Box>

            {auth && <AuthModal onDismiss={() => showAuth(false)}/>}

        </Stack>
    )
}

export default NavScreen;
