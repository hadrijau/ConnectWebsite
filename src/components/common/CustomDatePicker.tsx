import React, { Dispatch, SetStateAction } from "react";import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";


interface CustomDatePickerProps {
  value: Dayjs;
  setValue: Dispatch<SetStateAction<Dayjs>>;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({value, setValue}) => {
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Controlled picker"
          value={value}
          className='h-10 mt-2'
          onChange={(newValue) => setValue(newValue!)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default CustomDatePicker