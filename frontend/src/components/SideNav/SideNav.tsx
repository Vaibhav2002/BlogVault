import React, {useMemo, useState} from 'react';
import {Stack} from "@mui/material";
import ContainedIcon from "@/components/ContainedIcon";
import {CiBookmark, CiGrid42, CiHashtag, CiHome, CiSquarePlus} from "react-icons/ci";
import styles from "./SideNav.module.css";
import Link from "next/link";
import {useRouter} from "next/router";


interface SideNavProps {
    className: string
}


const SideNav = ({className}: SideNavProps) => {

    const [selectedIndex, setSelectedIndex] = useState(0)

    const iconSize = 24

    const getIconColor = (isSelected: Boolean) => isSelected ? "white" : "black"
    const getIconBgColor = (isSelected: Boolean) => isSelected ? "primary.main" : "background"

    const icons = useMemo(() => ([
            <CiHome size={iconSize} color={getIconColor(selectedIndex == 0)}/>,
            <CiGrid42 size={iconSize} color={getIconColor(selectedIndex == 1)}/>,
            <CiBookmark size={iconSize} color={getIconColor(selectedIndex == 2)}/>,
            <CiHashtag size={iconSize} color={getIconColor(selectedIndex == 3)}/>,
            <CiSquarePlus size={iconSize} color={getIconColor(selectedIndex == 4)}/>,
        ]
    ), [selectedIndex])

    const hrefs = [
        '/home',
        'home',
        'home',
        'home',
        '/blogs/create'
    ]

    const router = useRouter()

    const onIconSelected = (index: number) => {
        setSelectedIndex(index)
        router.push(hrefs[index])
    }

    return (
        <Stack spacing={4} className={className} padding={2}>

            {icons.map((icon, index) => (
                <ContainedIcon
                    icon={icon}
                    onClick={() => onIconSelected(index)}
                    sx={{backgroundColor: getIconBgColor(index == selectedIndex)}}
                    className={styles.navButton}
                />
            ))}

        </Stack>
    )
}

export default SideNav;
