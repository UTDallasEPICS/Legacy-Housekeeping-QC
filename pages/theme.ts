import { Roboto } from "next/font/google";
import { Montserrat } from "next/font/google";
import { Work_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const workSans = Work_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
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
  },
  typography: {
    fontFamily: workSans.style.fontFamily,
  },
});

export default theme;
