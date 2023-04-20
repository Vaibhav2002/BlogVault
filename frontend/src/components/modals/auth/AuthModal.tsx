import React, {useEffect} from 'react';
import useAuthModal from "@/hooks/UseAuthModal";
import LoginModal from "@/components/modals/auth/LoginModal";
import RegisterModal from "@/components/modals/auth/RegisterModal";

interface AuthModalProps {
    onDismiss:() => void
}

const AuthModal = ({onDismiss}: AuthModalProps) => {
    const {login, register, openAuthModal, switchToLogin, switchToRegister} = useAuthModal();
    useEffect(() => openAuthModal, [])
    return (
        <>
            {login && <LoginModal onDismiss={onDismiss} onMoveToRegister={switchToRegister}/>}
            {register && <RegisterModal onDismiss={onDismiss} onMoveToLogin={switchToLogin}/>}
        </>
    )
}

export default AuthModal;
