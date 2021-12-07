import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FC, memo } from "react";
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme({
    palette: {
        primary: {
            main: "#8d191d"
        }
    }
});
const divStyle = {
    width: "100%",
    "display": "flex",
    "justifyContent": "center",
    margin: "0 auto"
}

const LoaderProduct = () => {
    return (
        <div className="loader_box" style={divStyle}>
            <ThemeProvider theme={theme}>
                <CircularProgress color="primary" />
            </ThemeProvider>
        </div>)
}

export default LoaderProduct;