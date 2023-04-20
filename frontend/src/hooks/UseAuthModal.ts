import {useState} from "react";

export default function useAuthModal() {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const onLoginClick = () => setShowLogin(true)
    const closeLogin = () => setShowLogin(false)
    const onRegisterClick = () => setShowRegister(true)
    const closeRegister = () => setShowRegister(false)
    const onMovieToLogin = () => {
        closeRegister()
        onLoginClick()
    }
    const onMoveToRegister = () => {
        closeLogin()
        onRegisterClick()
    }

    return {
        login: showLogin,
        register: showRegister,
        openAuthModal: onLoginClick,
        switchToRegister: onMoveToRegister,
        switchToLogin: onMovieToLogin
    }
}