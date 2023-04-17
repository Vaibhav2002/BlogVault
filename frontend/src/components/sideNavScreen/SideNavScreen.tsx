import React, {useState} from 'react';
import {Box, Stack} from "@mui/material";
import SideNav from "@/components/SideNav";
import styles from "./SideNavScreen.module.css";

interface SideNavScreenProps {
    children: React.ReactNode
    className?: string
}

const SideNavScreen = ({children, className}: SideNavScreenProps) => {

    return (
        <Stack className={`${styles.root} ${className}`}>

            <SideNav
                className={styles.sideNav}
                sx={{
                    display: {
                        xs: "none",
                        md: "block"
                    }
                }}
            />

            <Box className={styles.content}>{children}</Box>

        </Stack>
    )
}

export default SideNavScreen;
