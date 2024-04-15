"use client";

import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Paper } from '@mui/material';

export default function BasicDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper elevation={3} sx={{padding: 2}}>
            <DateCalendar />
        </Paper>
    </LocalizationProvider>
  );
}