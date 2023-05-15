import React from 'react';
import {motion, MotionProps} from "framer-motion";
import {useTheme} from "@mui/material";

interface HeroCircleProps {
    className?: string
}

const HeroCircle = ({className, ...props}: HeroCircleProps & MotionProps) => {
    const palette = useTheme().palette
    return (
        <motion.div
            className={className}
            animate={{
                x: ['100%', '15%', "30%"],
                y: ['100%', "25%", '15%'],
                scale: 1,
                height: "100vh",
                width: "100vh",
                opacity: [1, 0.05]
            }}
            initial={{x: "100%", y: "100%", scale: 0, opacity: 1}}
            transition={{duration: 5, type: "tween", ease: "easeOut"}}
            style={{
                position: "absolute",
                backgroundColor: palette.primary.main,
                borderRadius: "50%",
                bottom: 0,
                right: 0,
            }}
            {...props}
        >
        </motion.div>
    )
}

export default HeroCircle;
