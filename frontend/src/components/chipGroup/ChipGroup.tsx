import React from 'react';
import {Box, BoxProps, Skeleton} from "@mui/material";
import styles from "@/components/chipGroup/ChipGroup.module.css";
import StyledChip from "@/components/styled/Chip";

interface ChipGroupProps<T> {
    items: T[]
    getLabel: (chip: T) => string
    gap?: number
    size?: "small" | "medium",
    onOptionSelected?: (option: T) => void,
    selectable?: boolean
    selected?: T
    className?: string
}

const ChipGroup = <T extends any>(
    {items, getLabel, gap = 2, size = "medium", onOptionSelected, className, ...props}: ChipGroupProps<T> & BoxProps
) => {
    return (
        <Box className={`${styles.container} ${className}`} gap={gap} {...props}>
            {items.map((chip, index) =>
                <StyledChip
                    key={index}
                    label={getLabel(chip)}
                    size={size}
                    onClick={e => {
                        e.stopPropagation()
                        onOptionSelected?.(chip)
                    }}
                    color={props.selectable && props.selected === chip ? "primary" : "default"}
                />
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
                    variant='rounded'
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
