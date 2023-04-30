import useCountdown from "@/hooks/useCountdown";
import {useState} from "react";

export default function useVerificationCode(){
    const coolDownTime = 30
    const {secondsLeft, start} = useCountdown()
    const [verificationPending, setVerificationPending] = useState(false)
    const [verificationCodeSending, setVerificationCodeSending] = useState(false)

    const sendVerificationCode = () => {
        setVerificationPending(false)
        setVerificationCodeSending(true)
    }

    const onVerificationCodeSent = () => {
        setVerificationPending(true)
        setVerificationCodeSending(false)
        start(coolDownTime)
    }

    const onVerificationCodeSendFailed = () => {
        setVerificationCodeSending(false)
    }

    const removePending = () => {
        setVerificationPending(false)
    }

    return {
        coolDownLeft: secondsLeft,
        verificationPending,
        verificationCodeSending,
        sendVerificationCode,
        onVerificationCodeSent,
        onVerificationCodeSendFailed,
        removePending
    }
}