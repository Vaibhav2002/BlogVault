import React from 'react';
import {Box, BoxProps, Chip} from "@mui/material";
import styles from "@/components/chipGroup/ChipGroup.module.css";
import StyledChip from "@/components/styled/Chip";

interface ChipGroupProps<T> {
    chips: T[]
    getLabel: (chip: T) => string
    className?: string
}

const ChipGroup = <T extends unknown>({chips, getLabel, className, ...props}: ChipGroupProps<T> & BoxProps) => {
    return (
        <Box className={`${styles.container} ${className}`} {...props}>
            {chips.map((chip, index) =>
                <StyledChip key={index} label={getLabel(chip)}/>
            )}
        </Box>
    )
}

export default ChipGroup;
