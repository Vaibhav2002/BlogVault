import React from 'react';
import {Stack, Typography, useTheme} from "@mui/material";
import {BsGithub} from "react-icons/bs";
import CenteredBox from "@/components/styled/CenteredBox";
import Link from "next/link";
import {SiGmail} from "react-icons/si";

interface FooterSectionProps {

    className?: string
}

const FooterSection = ({className}: FooterSectionProps) => {
    const palette = useTheme().palette
    return (
        <Stack
            spacing={6}
            alignItems='center'
            padding={{xs: 2, md: 4}}
            sx={{borderTop: '1px solid ' + palette.divider}}
        >
            <Stack direction='row' justifyContent='space-between' width='100%' alignItems='center'>
                <img src='/brand_name.png' alt='brand name' style={{height: '56px'}}/>

                <Stack alignItems='flex-end' spacing={1}>
                    <CenteredBox gap={1}>
                        <BsGithub/>
                        <a href='https://github.com/Vaibhav2002/BlogVault'>Source Code</a>
                    </CenteredBox>
                    <CenteredBox gap={1}>
                        <SiGmail/>
                        <Link href='mailto:vaibhav.jaiswal3011@gmail.com' color={palette.text.primary}>
                            Contact me
                        </Link>
                    </CenteredBox>
                </Stack>
            </Stack>

            <Typography variant='body1' textAlign='center'>
                Made with ❤️ by Vaibhav Jaiswal
            </Typography>

        </Stack>

    )
}

export default FooterSection;
