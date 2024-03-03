'use client';

import { MentorPreferences } from "@/app/redux/features/registration/state/preferences/mentorPreferences";
import { Box, Checkbox, Container, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MultipleSelector from "../details/multipleSelector";
import MenteeTypesData from "../../data/menteeTypesData";
import MentorIndustryPreferences from "../../data/mentorIndustryPreferences";
import React from "react";

const Preferences: React.FC<ChildProps> = (props) =>{
    const [dataStore, setDataStore] =  React.useState<string[]>([]);
    const [values, setValues]= useState<MentorPreferences>({
        undergrad_or_grad: undefined,
        postgrad: undefined,
        professional: undefined
    })

    const handleChange = (fieldName: keyof MentorPreferences, value: boolean) =>{
        setValues((prevValues)=>({
            ...prevValues,
            [fieldName]: value
        }))
    }

    useEffect(()=>{
        props.mentorPreferencesData(values);
    })
    
    return(
        <Box>
            <Container>
                <div style={{ alignItems: 'center', gap: '3%'}}>
                    <Typography sx={{margin:'1%'}}>What type/s of mentee would you prefer?</Typography>
                    <MultipleSelector data={MenteeTypesData} dataStore={(data: string[]) => setDataStore(data)}></MultipleSelector>
                </div>
                <div style={{ alignItems: 'center', gap: '3%'}}>
                    <Typography sx={{margin:'1%'}}>What industries or career transitions are you seeking mentorship?</Typography>
                    <MultipleSelector data={MentorIndustryPreferences} dataStore={(data: string[]) => setDataStore(data)}></MultipleSelector>
                </div>
            </Container>
        </Box>
    )
}

export default Preferences;