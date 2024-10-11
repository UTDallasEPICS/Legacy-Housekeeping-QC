import { Montserrat } from "next/font/google";
import { createTheme, PaletteOptions } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

declare module '@mui/material/styles' {
  interface Palette {
    navbar: {
      background: string;
    };
  }
  interface PaletteOptions {
    navbar?: {
      background?: string;
    };
  }
}

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#6A172E",
    },
    secondary: {
      main: "#324A5F",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fae3e4",
    },
    text: {
      primary: "#0C1821",
      secondary: "#FEFEFE",
      disabled: "#D3D3D3", // Light grey hex code
    },
    navbar: {
      background: "#6A172E",
    },
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

