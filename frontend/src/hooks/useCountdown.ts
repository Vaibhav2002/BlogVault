import {useEffect, useState} from "react";

export default function useCountdown() {
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        if (secondsLeft <= 0) return

        const timer = setTimeout(() => {
            setSecondsLeft(left => left - 1)
        }, 1000)

        return () => clearTimeout(timer)
    }, [secondsLeft])

    const start = (seconds: number) => setSecondsLeft(seconds)

    return {secondsLeft, start}
}