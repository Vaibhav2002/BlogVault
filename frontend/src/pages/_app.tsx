import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {CacheProvider, EmotionCache} from "@emotion/react";
import createEmotionCache from "@/utils/EmotionCache";
import {CssBaseline, ThemeProvider} from "@mui/material";
import blogVaultTheme from "@/theme/BlogVaultTheme";

const clientSideEmotionCache = createEmotionCache()

interface AppComponentProps extends AppProps {
    emotionCache: EmotionCache
}

export default function App({Component, pageProps, emotionCache = clientSideEmotionCache}: AppComponentProps) {
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={blogVaultTheme}>
                <CssBaseline/>
                <main>
                    <Component {...pageProps} />
                </main>
            </ThemeProvider>
        </CacheProvider>
    )
}
