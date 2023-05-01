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

const clientSideEmotionCache = createEmotionCache()

interface AppComponentProps extends AppProps {
    emotionCache: EmotionCache
}

export default function App({Component, pageProps, emotionCache = clientSideEmotionCache}: AppComponentProps) {

    const {showOnboardingModal} = useOnboardingModal()

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={blogVaultTheme}>
                <CssBaseline/>
                <AuthModalProvider>
                    <main>
                        <NextProgress/>
                        <Component {...pageProps} />
                        {showOnboardingModal && <OnBoardingModal/>}
                    </main>
                </AuthModalProvider>
            </ThemeProvider>
        </CacheProvider>
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