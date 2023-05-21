import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import {CacheProvider, EmotionCache} from "@emotion/react";
import createEmotionCache from "@/utils/EmotionCache";
import {CssBaseline, ThemeProvider} from "@mui/material";
import blogVaultTheme from "@/theme/BlogVaultTheme";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import OnBoardingModal from "@/components/modals/OnBoardingModal";
import {useEffect, useState} from "react";
import AuthModalProvider from "@/components/modals/auth/AuthModal";
import NextProgress from "next-progress";
import Head from "next/head";
import '@/utils/FirebaseConfig'
import {Analytics} from '@vercel/analytics/react';

const clientSideEmotionCache = createEmotionCache()

interface AppComponentProps extends AppProps {
    emotionCache: EmotionCache
}

export default function App({Component, pageProps, emotionCache = clientSideEmotionCache}: AppComponentProps) {

    const {showOnboardingModal} = useOnboardingModal()

    return (
        <>
            <Head>
                <title>BlogVault - Create and Share Your Stories with BlogVault</title>
                <meta name='description'
                      content='Explore Your Passions and Build Your Audience on Our User-Friendly Blogging Platform'/>
                <meta name='viewport' content='width=device-width, initial-scale=1'/>
                <link rel='icon' href='/favicon.ico'/>
                <meta property="og:image" key='og:image'
                      content="https://blogvault.vaibhavjaiswal.tech/social_media_preview.png"/>
                <meta name="twitter:card" content="summary_large_image"/>
            </Head>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={blogVaultTheme}>
                    <CssBaseline/>
                    <AuthModalProvider>
                        <NextProgress/>
                        <main>
                            <Component {...pageProps} />
                            {showOnboardingModal && <OnBoardingModal/>}
                            <Analytics/>
                        </main>
                    </AuthModalProvider>
                </ThemeProvider>
            </CacheProvider>
        </>

    )
}


const useOnboardingModal = () => {
    const {user} = useAuthenticatedUser()
    const [showOnboardingModal, setShowOnboardingModal] = useState(false)

    useEffect(() => {
        setShowOnboardingModal(!!(user && !user.username))
    }, [user]);

    return {showOnboardingModal}

}