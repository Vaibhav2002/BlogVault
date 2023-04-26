import React from 'react';
import PrimaryModal from "@/components/modals/PrimaryModal";
import {Stack, Typography} from "@mui/material";
import PrimaryButton from "@/components/styled/PrimaryButton";

interface ConfirmationModalProps {
    open: boolean,
    title: string
    message: string
    positiveButton?: string
    negativeButton?: string
    onPositiveClick: () => void
    onNegativeClick: () => void
}

const ConfirmationModal = (
    {
        open,
        title,
        message,
        positiveButton = "Confirm",
        negativeButton = "Cancel",
        onPositiveClick,
        onNegativeClick
    }: ConfirmationModalProps
) => {
    return (
        <PrimaryModal open={open} onDismiss={onNegativeClick}>
            <Typography variant="h5" marginBottom={1}>{title}</Typography>
            <Typography variant="body2">{message}</Typography>

            <Stack direction='row' spacing={1} marginTop={4}>
                <PrimaryButton fullWidth variant="contained" onClick={onPositiveClick}>{positiveButton}</PrimaryButton>
                <PrimaryButton fullWidth variant="outlined" onClick={onNegativeClick} color="error">
                    {negativeButton}
                </PrimaryButton>
            </Stack>
        </PrimaryModal>
    )
}

export default ConfirmationModal;
