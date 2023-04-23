import {Pagination, PaginationProps} from "@mui/material";

interface PaginationBarProps {
    page: number
    count: number
    onPageChange: (page: number) => void
    className?: string
}

const PaginationBar = ({page, count, onPageChange, className, ...props}: PaginationBarProps & PaginationProps) => {
    return (
        <Pagination
            page={page}
            count={count}
            variant="outlined"
            shape="rounded"
            color="primary"
            showFirstButton
            showLastButton
            onChange={(_, page) => onPageChange(page)}
            className={className}
            {...props}
        />
    )
}

export default PaginationBar;
