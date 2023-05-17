import useDevices from "@/hooks/useDevices";
import {Box, Stack, Typography, useTheme} from "@mui/material";
import useAnimatedText from "@/hooks/useAnimatedText";
import CenteredBox from "@/components/styled/CenteredBox";
import {motion, MotionProps} from "framer-motion";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {useRouter} from "next/router";
import Routes from "@/utils/Routes";
import React from "react";
import homeImg from '@/assets/images/home.png'
import discoverImg from '@/assets/images/discover.png'
import Image from "next/image";

const HeroSection = () => {
    const {isMobile} = useDevices()
    const palette = useTheme().palette
    const router = useRouter()
    const {textToDisplay: headline} = useAnimatedText({
        text: 'Create and Share Your Stories with BlogVault',
        interval: 100
    })
    const {textToDisplay: subHeading} = useAnimatedText({
        text: 'Explore Your Passions and Build Your Audience on Our User-Friendly Blogging Platform',
        interval: 50,
        delay: 4000,
    })

    const blogVaultIndex = `Create and Share Your Stories with BlogVault`.indexOf('BlogVault')

    const onGetStartedPress = () => {
        router.push(Routes.Home)
    }

    return (
        <Stack
            direction={{xs: 'column', md: 'row'}}
            height='100vh'
            overflow='hidden'
            padding={{xs: '3rem', md: '5rem'}}
            spacing={4}
            textAlign={{xs: 'center', md: 'start'}}
            // position='relative'
        >
            {!isMobile && <HeroCircle/>}
            <CenteredBox
                sx={{
                    gap: 4,
                    flexDirection: 'column',
                    alignItems: isMobile ? 'center' : 'flex-start',
                    flex: 0.5,
                    height: 1,
                    overflow: 'hidden'
                }}
            >

                <Stack spacing={2}>

                    <Typography variant={isMobile ? 'h4' : 'h2'} component={motion.h2} transition={{ease: 'easeIn'}}>
                        {headline.split('').map((letter, index) => {
                            if (index >= blogVaultIndex)
                                return (<motion.span key={index} style={{
                                    color: palette.secondary.main,
                                    fontWeight: 'bolder'
                                }}>{letter}</motion.span>)
                            return <motion.span key={index}>{letter}</motion.span>
                        })}
                    </Typography>

                    <Typography variant={isMobile ? 'body1' : 'h6'} fontWeight='400' color='text.disabled'
                                component={motion.h6} transition={{ease: 'easeIn'}}>
                        {subHeading}
                    </Typography>

                </Stack>

                <motion.div
                    initial={{scale: 0}} animate={{scale: 1}}
                    transition={{delay: 5, duration: 1, type: "spring", damping: 10, stiffness: 100}}
                >
                    <PrimaryButton
                        onClick={onGetStartedPress}
                        variant='contained'
                        sx={{padding: '1rem 4rem', borderRadius: '10rem'}}
                    >
                        Get Started
                    </PrimaryButton>
                </motion.div>
            </CenteredBox>

            <CenteredBox sx={{position: 'relative', height: 1, flex: 0.5}}>
                <HeroImage url={homeImg} top='50%' left='0'/>
                <HeroImage url={discoverImg} top='60%' left='15%' animationDelay={2}/>
            </CenteredBox>
        </Stack>
    )
}

interface HeroImageProps {
    url: any,
    animationDelay?: number,
    top: string,
    left: string
}

const HeroImage = ({url, top, left, animationDelay = 1.5}: HeroImageProps) => {
    return (
        <motion.div
            style={{
                position: 'absolute',
                width: '90%',
                aspectRatio: '3/2',
                transform: 'translateY(-50%)',
                top: top,
                left: left
            }}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ease: 'easeIn', duration: 1, delay: animationDelay}}
        >
            <Box height={1}>
                <Box position='relative' width={1} height={1}>
                    <Image src={url} alt="home" fill/>
                </Box>
            </Box>
        </motion.div>

    )
}

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
                opacity: [1, 0.1]
            }}
            initial={{x: "100%", y: "100%", scale: 0, opacity: 1}}
            transition={{duration: 5, type: "tween", ease: "easeOut"}}
            style={{
                position: "absolute",
                backgroundColor: palette.secondary.main,
                borderRadius: "50%",
                bottom: 0,
                right: 0
            }}
            {...props}
        >
        </motion.div>
    )
}

export default HeroSection;