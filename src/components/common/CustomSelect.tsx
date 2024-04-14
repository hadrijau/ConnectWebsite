import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "@/styles/components/CustomSelect.css";

interface Option {
  label: string;
  value: number;
}

interface CustomSelectProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: Option[]
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, setValue, options }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: "50%" }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="pl-3"
          value={value}
          onChange={handleChange}
        >
          {options.map((option, index) => {
            return (
              <MenuItem value={option.value} key={index}>{option.label}</MenuItem>
            )
          })}

        </Select>
      </FormControl>
    </Box>
  );
}

export default CustomSelect