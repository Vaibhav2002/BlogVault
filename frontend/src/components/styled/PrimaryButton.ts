import {Button, styled} from "@mui/material";

const PrimaryButton = styled(Button)(() => ({
    variant:'contained',
    borderRadius: '8px',
    textTransform: 'none',
    textDecoration:'none',
    padding: '0.6rem 1rem'
}))

export default PrimaryButton