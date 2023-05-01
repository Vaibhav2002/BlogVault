import React, {createContext, ReactNode, useCallback, useState} from 'react';
import LoginModal from "@/components/modals/auth/LoginModal";
import RegisterModal from "@/components/modals/auth/RegisterModal";
import PasswordResetModal from "@/components/modals/auth/PasswordResetModal";

interface AuthModalsContext {
    showLogin: () => void
    showRegister: () => void
    showResetPassword: () => void
}

export const AuthModalsContext = createContext<AuthModalsContext>({
    showLogin: () => {
        throw Error('showLogin not implemented')
    },
    showRegister: () => {
        throw Error('showRegister not implemented')
    },
    showResetPassword: () => {
        throw Error('showResetPassword not implemented')
    }
})

interface AuthModalProps {
    children: ReactNode
}

const AuthModalProvider = ({children}: AuthModalProps) => {
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showResetPassword, setShowResetPassword] = useState(false)

    const onMovieToLogin = useCallback(() => {
        setShowRegister(false)
        setShowLogin(true)
    }, [])

    const onMoveToRegister = useCallback(() => {
        setShowResetPassword(false)
        setShowLogin(false)
        setShowRegister(true)
    }, [])

    const onForgotPasswordClick = useCallback(() => {
        setShowLogin(false)
        setShowResetPassword(true)
    }, [])

    const [values] = useState({
        showLogin: () => setShowLogin(true),
        showRegister: () => setShowRegister(true),
        showResetPassword: () => setShowResetPassword(true)
    })

    return (
        <AuthModalsContext.Provider value={values}>
            {children}
            {showLogin &&
                <LoginModal
                    onDismiss={() => setShowLogin(false)}
                    onMoveToRegister={onMoveToRegister}
                    onForgotPassword={onForgotPasswordClick}
                />
            }
            {showRegister &&
                <RegisterModal
                    onDismiss={() => setShowRegister(false)}
                    onMoveToLogin={onMovieToLogin}
                />
            }
            {showResetPassword &&
                <PasswordResetModal
                    onDismiss={() => setShowResetPassword(false)}
                    moveToRegister={onMoveToRegister}
                />
            }
        </AuthModalsContext.Provider>
    )
}

export default AuthModalProvider;
