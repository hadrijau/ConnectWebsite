import { CircularProgress } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <p>Veuillez patienter...</p>
        <CircularProgress />
      </div>
    </div>
  );
}
