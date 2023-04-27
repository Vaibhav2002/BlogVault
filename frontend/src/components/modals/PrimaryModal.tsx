import React, {ReactElement} from 'react';
import styles from "@/styles/Modal.module.css"
import {Box, BoxProps, Modal} from "@mui/material";
import {motion} from "framer-motion";

interface ModalProps {
    open: boolean
    className?: string
    onDismiss: () => void
    lgSize?: string
    children: ReactElement[] | ReactElement
}

const spring = {
    type: "spring",
    damping: 10,
    stiffness: 100
}

const PrimaryModal = ({open, children, onDismiss, lgSize="35%", className, ...props}: ModalProps & BoxProps) => {
    return (
        <Modal
            open={open}
            disablePortal
            onClose={onDismiss}
            className={`${styles.modalContainer} ${className}`}

        >
            <Box
                sx={{
                    width: {xs: '90%', sm: '60%', lg: lgSize},
                    backgroundColor: 'background.paper',
                }}
                component={motion.div}
                transition={spring}
                initial={{scale: 0}}
                animate={{scale: 1}}
                className={styles.modal}
                padding={4}
                {...props}
            >
                {children}
            </Box>

        </Modal>
    )
}

export default PrimaryModal;
