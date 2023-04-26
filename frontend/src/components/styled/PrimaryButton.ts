import {Button, styled} from "@mui/material";

const PrimaryButton = styled(Button)(() => ({
    variant:'contained',
    borderRadius: '8px',
    textTransform: 'none',
    textDecoration:'none',
    padding: '0.7rem 4rem'
}))

export default PrimaryButton