import React from 'react';
import {Box, BoxProps, Chip} from "@mui/material";
import styles from "@/components/chipGroup/ChipGroup.module.css";
import StyledChip from "@/components/styled/Chip";

interface ChipGroupProps<T> {
    items: T[]
    getLabel: (chip: T) => string
    gap?:number

    size?: "small" | "medium"
    className?: string
}

const ChipGroup = <T extends unknown>({items, getLabel, gap=2, size = "medium", className, ...props}: ChipGroupProps<T> & BoxProps) => {
    return (
        <Box className={`${styles.container} ${className}`} gap={gap} {...props}>
            {items.map((chip, index) =>
                <StyledChip key={index} label={getLabel(chip)} size={size}/>
            )}
        </Box>
    )
}

export default ChipGroup;
