import React, {ReactElement} from 'react';
import CenteredBox from "@/components/styled/CenteredBox";
import {BoxProps} from "@mui/material";

interface ContainedIconProps {
    icon: ReactElement
    className?: string
}

const ContainedIcon = ({icon, className, ...props}: ContainedIconProps & BoxProps) => {
    return (
        <CenteredBox
            padding={1}
            borderRadius={2}
            {...props}
            className={className}
        >
            {icon}
        </CenteredBox>
    )
}

export default ContainedIcon;
