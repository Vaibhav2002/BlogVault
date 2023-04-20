import React, {ReactElement} from 'react';
import styles from "@/styles/Modal.module.css"
import {Box, Modal} from "@mui/material";
import {motion} from "framer-motion";

interface ModalProps {
    open: boolean
    className?: string
    onDismiss: () => void
    children: ReactElement
}

const spring = {
    type: "spring",
    damping: 10,
    stiffness: 100
}

const PrimaryModal = ({open, children, onDismiss, className}: ModalProps) => {
    return (
        <Modal
            open={open}
            disablePortal
            onClose={onDismiss}
            className={`${styles.modalContainer} ${className}`}

        >
            <Box
                sx={{
                    width: {xs: '90%', sm: '60%', lg: '35%'},
                    backgroundColor: 'background.paper',
                }}
                component={motion.div}
                transition={spring}
                initial={{scale: 0}}
                animate={{scale: 1}}
                className={styles.modal}
            >
                {children}
            </Box>

        </Modal>
    )
}

export default PrimaryModal;
