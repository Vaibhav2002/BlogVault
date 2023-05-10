import {Box, styled} from "@mui/material";

const BottomGradientBox = styled(Box)(() => ({
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "linear-gradient(360deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
}));

export default BottomGradientBox;