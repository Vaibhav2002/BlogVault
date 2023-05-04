import React from 'react';
import {Box} from "@mui/material";

interface DotProps {
    className?: string
}

const Dot = ({className}: DotProps) => {
    return (
        <Box className={className} height="4px" width="4px" sx={{borderRadius: "2px", backgroundColor: "text.disabled"}}/>
    )
}

export default Dot;
