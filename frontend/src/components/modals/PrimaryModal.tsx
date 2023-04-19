import React, {ReactElement} from 'react';
import styles from "@/styles/Modal.module.css"
import {Box, Modal} from "@mui/material";

interface ModalProps {
    open: boolean
    className?: string
    onDismiss: () => void
    children: ReactElement
}

const PrimaryModal = ({open, children, onDismiss, className}: ModalProps) => {
    return (
        <Modal
            open={open}
            className={className}
            disablePortal
            onClose={onDismiss}
        >
            <Box
                className={styles.modal}
                sx={{
                    width: {xs: '90%', sm: '60%', lg: '35%'},
                    backgroundColor: 'background.paper'
                }}
            >
                {children}
            </Box>
        </Modal>
    )
}

export default PrimaryModal;
