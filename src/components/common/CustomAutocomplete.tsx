"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/system";

interface CustomAutocompleteProps {
  options: string[];
  value: string;
  setValue: (value: string | null) => void;
  placeholder?: string
}

const StyledAutocomplete = styled(Autocomplete)<{ error: boolean; value: string | undefined }>(
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

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  options,
  value,
  setValue,
  placeholder
}) => {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <StyledAutocomplete
      value={value}
      //@ts-ignore
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
      }}
      style={{borderColor: "gray"}}
      freeSolo
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={options}
      sx={{ width: "100%", padding: '0px' }}
      renderInput={(params) =>         <TextField
        style={{borderColor: "gray"}}
        {...params}
        placeholder={placeholder}
        InputProps={{
          ...params.InputProps,
          sx: {
            padding: '0px',
          },
        }}
      />}
    />
  );
};

export default CustomAutocomplete;
