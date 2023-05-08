import React from 'react';
import {Box, BoxProps, Skeleton} from "@mui/material";
import styles from "@/components/chipGroup/ChipGroup.module.css";
import StyledChip from "@/components/styled/Chip";

interface ChipGroupProps<T> {
    items: T[]
    getLabel: (chip: T) => string
    gap?: number
    size?: "small" | "medium"
    className?: string
}

const ChipGroup = <T extends unknown>(
    {items, getLabel, gap = 2, size = "medium", className, ...props}: ChipGroupProps<T> & BoxProps
) => {
    return (
        <Box className={`${styles.container} ${className}`} gap={gap} {...props}>
            {items.map((chip, index) =>
                <StyledChip key={index} label={getLabel(chip)} size={size}/>
            )}
        </Box>
    )
}

interface ChipGroupSkeletonProps {
    count: number
    gap?: number
    size?: "small" | "medium"
    className?: string
}

export const ChipGroupSkeleton = ({count, gap = 2, size = 'medium', className}: ChipGroupSkeletonProps) => {
    const width = size === "small" ? 60 : 100
    const randomizedWidth = () => width + ((Math.random() - 0.5) * width)
    const height = 32

    return (
        <Box className={`${styles.container} ${className}`} gap={gap}>
            {[...Array(count)].map((chip, index) =>
                <Skeleton
                    variant='rectangular'
                    width={randomizedWidth()}
                    height={height}
                    key={index}
                    sx={{borderRadius: 1}}
                />
            )}
        </Box>
    )
}

export default ChipGroup;
