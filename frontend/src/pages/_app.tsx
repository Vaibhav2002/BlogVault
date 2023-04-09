import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Open_Sans} from "next/font/google";
import {CacheProvider, EmotionCache} from "@emotion/react";
import createEmotionCache from "@/utils/EmotionCache";

const openSans = Open_Sans({subsets: ['latin']})
const clientSideEmotionCache = createEmotionCache()

interface AppComponentProps extends AppProps {
    emotionCache: EmotionCache
}

export default function App({Component, pageProps, emotionCache = clientSideEmotionCache}: AppComponentProps) {
    return (
        <CacheProvider value={emotionCache}>
            <div className={openSans.className}>
                <main>
                    <Component {...pageProps} />
                </main>
            </div>
        </CacheProvider>
    )
}
