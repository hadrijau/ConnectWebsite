"use client";
import { Poppins } from "next/font/google";

import { createTheme } from "@mui/material/styles";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const theme = createTheme({
  palette: {
    mode: "light",
    text: {
      secondary: "grey",
    },
    divider: "rgba(0, 0, 0, 0.50)",
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;
