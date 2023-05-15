import useDevices from "@/hooks/useDevices";
import {Stack, Typography, useTheme} from "@mui/material";
import useAnimatedText from "@/hooks/useAnimatedText";
import CenteredBox from "@/components/styled/CenteredBox";
import HeroCircle from "@/components/landingPage/HeroCircle";
import {motion} from "framer-motion";
import PrimaryButton from "@/components/styled/PrimaryButton";
import {useRouter} from "next/router";
import Routes from "@/utils/Routes";

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
        <CenteredBox
            height='100vh'
            overflow='hidden'
            padding={isMobile ? '10%' : '20%'}
            textAlign='center'
            position='relative'
        >
            <HeroCircle/>
            <Stack spacing={4} zIndex={3}>

                <Stack spacing={2}>

                    <Typography variant={isMobile ? 'h4' : 'h2'} component={motion.h2} transition={{ease: 'easeIn'}}>
                        {headline.split('').map((letter, index) => {
                            if (index >= blogVaultIndex)
                                return <motion.span key={index}
                                                    style={{color: palette.secondary.main}}>{letter}</motion.span>
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
            </Stack>
        </CenteredBox>
    )
}

export default HeroSection;