import { Montserrat } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#141c3b",
    },
    secondary: {
      main: "#d34727",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#eaeaea",
    }
  },
  typography: {
    fontFamily: "Arial",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
