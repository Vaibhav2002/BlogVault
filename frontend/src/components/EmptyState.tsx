import React from 'react';
import emptyState from '@/assets/images/empty_state.jpg';
import CenteredBox from "@/components/styled/CenteredBox";
import {Box, BoxProps, Button, Typography} from "@mui/material";
import Image from "next/image";

interface EmptyStateProps {
    title: string,
    message?: string,
    showImage?: boolean
    className?: string,
    ctaText?: string,
    onCtaClick?: () => void
}

const EmptyState = ({title, message, showImage = true, className, ...props}: EmptyStateProps & BoxProps) => {
    return (
        <CenteredBox className={className} flexDirection='column' {...props}>
            {showImage && <Box width='70%' sx={{aspectRatio: '1/1', position: 'relative'}}>
                <Image src={emptyState} alt='Empty State' fill priority/>
            </Box>}
            <CenteredBox flexDirection='column'>
                <Typography variant='h5' color='text.primary'>{title}</Typography>
                {message && <Typography variant='body1' color='text.secondary'>{message}</Typography>}
                {props.ctaText &&
                    <Button variant='contained' fullWidth={false} onClick={props.onCtaClick}>
                        {props.ctaText}
                    </Button>
                }
            </CenteredBox>
        </CenteredBox>
    )
}

export default EmptyState;
