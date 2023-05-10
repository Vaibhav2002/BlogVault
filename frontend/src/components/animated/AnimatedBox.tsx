import React, {ReactNode} from 'react';
import {Box, BoxProps} from "@mui/material";
import {motion, MotionProps} from "framer-motion";

interface AnimatedBoxProps {
    children: ReactNode
    className?: string
}

const AnimatedBox = ({children, className, ...props}: AnimatedBoxProps & MotionProps & BoxProps) => {
    return (
        <Box component={motion.div}{...props}>
            {children}
        </Box>
    )
}

export default AnimatedBox;
