"use client";

import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Paper } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';

export default function BasicDateCalendar() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  useEffect(()=>{
    console.log(value?.$d)
  },[value])
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper elevation={3} sx={{padding: 2}}>
            <DateCalendar onChange={(newValue) => setValue(newValue)} />
        </Paper>
    </LocalizationProvider>
  );
}