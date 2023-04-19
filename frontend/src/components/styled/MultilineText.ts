import {styled, Typography} from "@mui/material";

interface MultilineTextProps {
    maxLines: number
}

const MultilineText = styled(Typography)(({maxLines}: MultilineTextProps) => ({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: maxLines,
    maxLines: maxLines,
    wordWrap: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis"
}))

export default MultilineText