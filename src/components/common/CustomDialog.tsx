"use client";
import React, { ReactNode } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ onClose, open, children }) => {
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={maxWidth}>
      {children}
    </Dialog>
  );
};

export default CustomDialog;
