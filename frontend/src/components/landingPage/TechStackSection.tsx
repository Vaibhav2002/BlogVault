import React from 'react';
import {Divider, Stack, Typography} from "@mui/material";
import CenteredBox from "@/components/styled/CenteredBox";
import useDevices from "@/hooks/useDevices";

interface TechStackSectionProps {

    className?: string
}

const TechStackSection = ({className}: TechStackSectionProps) => {
    const {isMobile} = useDevices()
    const icons = [
        'nextjs', 'react', 'mui', 'ts', 'html', 'css', 'sass', 'webpack',
        'nodejs', 'expressjs', 'mongodb', 'redis', 'vercel', 'gcp'
    ].join(',')
    const perLine = isMobile ? 5 : 20;
    return (
        <Stack
            spacing={{xs: 6, md: 8, lg: 10}}
            paddingX={{xs: 4, md: 6, lg: 14}}
            paddingY={{xs: 6, md: 8, lg: 10}}
        >
            <CenteredBox paddingX={2} width={1} gap={4}>
                <Divider style={{flex: '1'}}/>
                <Typography variant={isMobile ? 'h5' : 'h3'} textAlign='center' fontWeight='bold'>Built
                    using</Typography>
                <Divider style={{flex: '1'}}/>
            </CenteredBox>
            <CenteredBox>
                <img
                    src={`https://skillicons.dev/icons?i=${icons}&theme=light&perline=${perLine}`}
                    alt='Tech Stack'
                />
            </CenteredBox>
        </Stack>
    )
}

export default TechStackSection;
