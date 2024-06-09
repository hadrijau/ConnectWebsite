import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTheme } from '@mui/material/styles';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

interface Option {
  label: string;
  value: number;
}

interface CustomSelectProps {
  name: string;
  value: string | number;
  onChange: (event: SelectChangeEvent<string | number>) => void;
  onBlur: (event: React.FocusEvent<any>) => void;
  options: Option[];
  placeholder: string;
  error?: boolean;
  helperText?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  error = false,
  helperText = "",
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ minWidth: "50%" }}>
      <FormControl fullWidth variant="outlined" error={error}>
        <InputLabel>{placeholder}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={name}
          name={name}
          value={value}
          className="px-2"
          onChange={onChange}
          onBlur={onBlur}
          input={<OutlinedInput label={placeholder} />}
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
            '& .MuiSelect-select': {
              paddingLeft: theme.spacing(1),
            }
          }}
        >
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem value={option.value} key={index}>{option.label}</MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
}

export default CustomSelect;
