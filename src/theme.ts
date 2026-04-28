import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4F46E5", // indigo vibrant
      light: "#818CF8",
      dark: "#3730A3",
    },
    secondary: {
      main: "#06B6D4", // cyan
    },
    success: {
      main: "#22C55E",
    },
    error: {
      main: "#EF4444",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial",
    h5: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
  },
  shape: {
    borderRadius: 12,
  },
});