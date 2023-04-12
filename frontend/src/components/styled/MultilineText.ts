import {styled, Typography} from "@mui/material";

interface MultilineTextProps {
    maxLines: number
}

const MultilineText = styled(Typography)(({maxLines}: MultilineTextProps) => ({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: maxLines,
    overflow: "hidden",
    textOverflow: "ellipsis"
}))

export default MultilineText