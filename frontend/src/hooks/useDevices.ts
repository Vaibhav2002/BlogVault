import {Theme, useMediaQuery} from "@mui/material";

export default function useDevices() {
    const isMobile = useMediaQuery((theme:Theme) => theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery((theme:Theme) => theme.breakpoints.between('sm', 'md'))
    const isLaptop = useMediaQuery((theme:Theme) => theme.breakpoints.between('md', 'lg'))
    const isDesktop = useMediaQuery((theme:Theme) => theme.breakpoints.up('lg'))

    return {isMobile, isTablet, isLaptop, isDesktop}
}