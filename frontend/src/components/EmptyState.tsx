import React from 'react';
import emptyState from '@/assets/images/empty_state.jpg';
import CenteredBox from "@/components/styled/CenteredBox";
import {Box, BoxProps, Typography} from "@mui/material";
import Image from "next/image";
import PrimaryButton from "@/components/styled/PrimaryButton";

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
                <Typography variant='h5' color='text.primary' textAlign='center'>{title}</Typography>
                {message && <Typography variant='body1' color='text.secondary' textAlign='center'
                                        marginBottom={4}>{message}</Typography>}
                {props.ctaText &&
                    <PrimaryButton variant='contained' onClick={props.onCtaClick} sx={{paddingX: '4rem'}}>
                        {props.ctaText}
                    </PrimaryButton>
                }
            </CenteredBox>
        </CenteredBox>
    )
}

export default EmptyState;
