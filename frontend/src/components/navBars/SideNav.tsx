import React, {ReactElement, useMemo, useState} from 'react';
import {Stack, StackProps} from "@mui/material";
import ContainedIcon from "@/components/ContainedIcon";
import {CiBookmark, CiGrid42, CiHome, CiSquarePlus} from "react-icons/ci";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import {NavOptions, navOptions} from "@/components/navBars/NavOptions";

interface SideNavProps {
    selected: number
    className: string
}

const iconSize = 24

const getIconColor = (isSelected: Boolean) => isSelected ? "white" : "black"
const getIconBgColor = (isSelected: Boolean) => isSelected ? "primary.main" : "background"

const getIconForNavItem = (option: NavOptions, selected: boolean) => {
    switch (option.name) {
        case "Home":
            return <CiHome size={iconSize} color={getIconColor(selected)}/>
        case "Discover":
            return <CiGrid42 size={iconSize} color={getIconColor(selected)}/>
        case "Bookmarks":
            return <CiBookmark size={iconSize} color={getIconColor(selected)}/>
        case "Create":
            return <CiSquarePlus size={iconSize} color={getIconColor(selected)}/>
    }
}

interface SideNavItems {
    navItem: NavOptions
    icon: ReactElement
}

const SideNav = ({selected = 0, className, ...props}: SideNavProps & StackProps) => {

    const [selectedIndex, setSelectedIndex] = useState(selected)

    const navItems = useMemo(() => navOptions.map((option, index) => (
        {
            navItem: option,
            icon: getIconForNavItem(option, selectedIndex === index)
        } as SideNavItems
    )), [selectedIndex])

    const router = useRouter()

    const onIconSelected = (index: number) => {
        setSelectedIndex(index)
        router.push(navItems[index].navItem.href)
    }

    return (
        <Stack spacing={4} className={className} padding={3} {...props}>

            {navItems.map((item, index) => (
                <ContainedIcon
                    key={index}
                    icon={item.icon}
                    onClick={() => onIconSelected(index)}
                    sx={{
                        backgroundColor: getIconBgColor(index == selectedIndex),
                        cursor: "pointer"
                    }}
                    component={motion.div}
                    whileHover={{scale: 1.3}}
                />
            ))}

        </Stack>
    )
}

export default SideNav;
