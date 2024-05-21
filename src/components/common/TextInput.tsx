import React from "react";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";

interface TextInputProps {
  label?: string;
  name: string;
  error?: boolean;
  id?: string;
  multiline?: boolean;
  className?: string;
  value?: string;
  rows?: number;
  helperText?: string | false;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  type: string;
}

const StyledTextField = styled(TextField)<{ error: boolean; value: string | undefined }>(
  ({ theme, error, value }) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: error ? "red" : value ? "green" : "gray",
      },
      "&:hover fieldset": {
        borderColor: error ? "red" : value ? "green" : "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: error ? "red" : value ? "green" : "blue",
      },
    },
  })
);

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  error = false,
  id,
  type,
  placeholder,
  className,
  multiline,
  value,
  helperText,
  rows,
  onChange,
  onBlur,
  ...props
}) => {
  return (
    <StyledTextField
      id={id}
      name={name}
      label={label}
      type={type}
      placeholder={placeholder}
      multiline={multiline}
      value={value}
      helperText={helperText}
      error={error}
      rows={rows}
      onChange={onChange}
      onBlur={onBlur}
      className={className}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
};

export default TextInput;
