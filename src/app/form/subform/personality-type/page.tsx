'use client'

import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { PersonalityTypeData } from "../../data/personalityTypeData";
import { PersonalityType } from "@/app/redux/features/registration/state/personality-type/personalityType";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";


const PersonalityTypeComponent: React.FC<ChildProps> = (props) => {
  const [personalityType, setPersonalityType] = React.useState('');
  const personalityTypeState = useSelector((state: RootState)=>state.registration.personalityType);
  const [value, setValue] = useState<PersonalityType>({
    personalityType: personalityTypeState.personalityType,
  });

  const handleInputChange = (fieldName: keyof PersonalityType, value: string) =>{
    setValue((prevValues)=>({
        ...prevValues,
        [fieldName]: value
    }))
  }

  useEffect(() => {
    props.personalityType(value);
  });

  useEffect(() => {
    handleInputChange('personalityType', personalityType);
  },[personalityType]);


  const handleChange = (event: SelectChangeEvent) => {
    setPersonalityType(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Personality Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={personalityType}
          label="Age"
          onChange={handleChange}
        >
            {PersonalityTypeData.map((value)=>(
                <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PersonalityTypeComponent;
