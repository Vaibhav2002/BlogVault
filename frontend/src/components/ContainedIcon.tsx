import React, {ReactElement} from 'react';
import CenteredBox from "@/components/styled/CenteredBox";
import {BoxProps, Tooltip} from "@mui/material";

interface ContainedIconProps {
    title: string
    icon: ReactElement
    className?: string
}

const ContainedIcon = ({icon, title, className, ...props}: ContainedIconProps & BoxProps) => {
    return (
        <Tooltip title={title} enterDelay={500}>
            <CenteredBox
                padding={1}
                borderRadius={2}
                {...props}
                className={className}
            >
                {icon}
            </CenteredBox>
        </Tooltip>

    )
}

export default ContainedIcon;
