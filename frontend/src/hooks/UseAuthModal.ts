import {useState} from "react";

export default function useAuthModal() {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showResetPassword, setShowResetPassword] = useState(false)

    const onLoginClick = () => setShowLogin(true)
    const onMovieToLogin = () => {
        setShowRegister(false)
        setShowLogin(true)
    }
    const onMoveToRegister = () => {
        setShowResetPassword(false)
        setShowLogin(false)
        setShowRegister(true)
    }

    const onForgotPasswordClick = () => {
        setShowLogin(false)
        setShowResetPassword(true)
    }

    return {
        login: showLogin,
        register: showRegister,
        resetPassword: showResetPassword,
        openAuthModal: onLoginClick,
        forgotPassword: onForgotPasswordClick,
        switchToRegister: onMoveToRegister,
        switchToLogin: onMovieToLogin
    }
}