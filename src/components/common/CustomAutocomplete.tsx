"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface CustomAutocompleteProps {
  options: string[];
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  options,
  value,
  setValue,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <Autocomplete
      value={value}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Controllable" />}
    />
  );
};
