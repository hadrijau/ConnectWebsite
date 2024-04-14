"use client";
import React, { Dispatch, SetStateAction } from "react";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "@/styles/components/CustomDateField.css";
import 'dayjs/locale/en-gb';
import { Dayjs } from "dayjs";

interface CustomDateFieldProps {
  date: Dayjs;
  setDate: Dispatch<SetStateAction<Dayjs>>;
}

const CustomDateField: React.FC<CustomDateFieldProps> = ({ date, setDate }) => {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DateField
          variant="standard"
          value={date}
          onChange={(newValue) => setDate(newValue!)}
        />
      </LocalizationProvider>
  );
};

export default CustomDateField;
