import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "@/styles/components/CustomSelect.css";

export default function CustomSelect({ value, setValue, label }) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: "50%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          variant="standard"
          onChange={handleChange}
        >
          <MenuItem value={10}>3 mois</MenuItem>
          <MenuItem value={20}>4 mois</MenuItem>
          <MenuItem value={30}>5 mois</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
