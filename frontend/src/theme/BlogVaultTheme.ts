import {createTheme} from "@mui/material";
import colorPalette from "@/theme/ColorPalette";
import typography from "@/theme/Typography";

const blogVaultTheme = createTheme({
    palette: colorPalette,
    typography: typography,
    components: {
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: '#5A5A5A',
                }
            }
        }
    }
})

export default blogVaultTheme;
