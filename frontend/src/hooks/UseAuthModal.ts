import {useState} from "react";

export default function useAuthModal() {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const onLoginClick = () => setShowLogin(true)
    const onMovieToLogin = () => {
        setShowRegister(false)
        setShowLogin(true)
    }
    const onMoveToRegister = () => {
        setShowLogin(false)
        setShowRegister(true)
    }

    return {
        login: showLogin,
        register: showRegister,
        openAuthModal: onLoginClick,
        switchToRegister: onMoveToRegister,
        switchToLogin: onMovieToLogin
    }
}