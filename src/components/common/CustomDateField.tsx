"use client";
import React from "react";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import "@/styles/components/CustomDateField.css";
import 'dayjs/locale/en-gb';
import { Dayjs } from "dayjs";

interface CustomDateFieldProps {
  name: string;
  value: Dayjs;
  onChange: (value: Dayjs | null) => void;
  onBlur: (event: React.FocusEvent<any>) => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
}

const CustomDateField: React.FC<CustomDateFieldProps> = ({
  name,
  value,
  onChange,
  onBlur,
  error = false,
  helperText = "",
  placeholder = ""
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ minWidth: "50%" }}>
      <FormControl fullWidth variant="outlined" error={error}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DateField
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={placeholder}
            inputProps={{
              placeholder: placeholder,
            }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? theme.palette.error.main : theme.palette.divider,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? theme.palette.error.main : theme.palette.text.primary,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
              },
            }}
          />
        </LocalizationProvider>
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default CustomDateField;
