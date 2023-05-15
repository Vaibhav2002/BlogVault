import {useEffect, useState} from "react";

interface UseAnimatedTextProps {
    text: string,
    interval?: number,
    delay?: number
}

export default function useAnimatedText({text, interval = 100, delay = 0}: UseAnimatedTextProps) {
    const [textToDisplay, setTextToDisplay] = useState<string>('')

    useEffect(() => {
        const timeout = setTimeout(() => {
            let count = 0
            const intervalId = setInterval(() => {
                setTextToDisplay(text.slice(0, count++));
                if (count > text.length) clearInterval(intervalId);
            }, interval);

            return () => clearInterval(intervalId)
        }, delay)

        return () => clearTimeout(timeout)
    }, [])

    return {textToDisplay}
}