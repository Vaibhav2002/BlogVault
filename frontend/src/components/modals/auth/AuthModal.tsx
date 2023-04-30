import React, {useEffect} from 'react';
import useAuthModal from "@/hooks/UseAuthModal";
import LoginModal from "@/components/modals/auth/LoginModal";
import RegisterModal from "@/components/modals/auth/RegisterModal";
import PasswordResetModal from "@/components/modals/auth/PasswordResetModal";

interface AuthModalProps {
    onDismiss:() => void
}

const AuthModal = ({onDismiss}: AuthModalProps) => {
    const {login, register, resetPassword, openAuthModal, forgotPassword, switchToLogin, switchToRegister} = useAuthModal();
    useEffect(() => openAuthModal, [])
    return (
        <>
            {login && <LoginModal onDismiss={onDismiss} onMoveToRegister={switchToRegister} onForgotPassword={forgotPassword}/>}
            {register && <RegisterModal onDismiss={onDismiss} onMoveToLogin={switchToLogin}/>}
            {resetPassword && <PasswordResetModal onDismiss={onDismiss} moveToRegister={switchToRegister}/>}
        </>
    )
}

export default AuthModal;
