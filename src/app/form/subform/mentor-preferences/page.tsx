'use client';

import { MentorPreferences } from "@/app/redux/features/registration/state/preferences/mentorPreferences";
import { Autocomplete, Box, Checkbox, Container, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MultipleSelector from "../details/multipleSelector";
import MenteeTypesData from "../../data/menteeTypesData";
import industrySectorData from "../../data/industrySectorData";
import React from "react";
import { mentorPreferencesSelector } from "@/app/redux/selector";
import { useSelector } from "react-redux";

interface MentorProfessionalDetailsDataProps{
    mentorPreferencesData: (data: MentorPreferences) => void;
}

const Preferences: React.FC<MentorProfessionalDetailsDataProps> = ({mentorPreferencesData}) =>{
    const mentorPreferencesState = useSelector(mentorPreferencesSelector);
    const [chosenPreferences, setChosenPreferences] = React.useState<[]>([]);
    const [mentorPreferences, setMentorPreferences]= useState<MentorPreferences>({
        preferences: mentorPreferencesState.preferences,
        specialisation: mentorPreferencesState.specialisation,
        otherSpecialisation: mentorPreferencesState.otherSpecialisation
    })
    const [chosenSpecialisation, setChosenSpecialisation] = React.useState<[]>([]);
    const [chosenOtherSpecialisation, setChosenOtherSpecialisation]= useState("");
    
    useEffect(() => {
        setMentorPreferences({
            preferences: chosenPreferences,
            specialisation: chosenSpecialisation,
            otherSpecialisation: chosenOtherSpecialisation
        })
    }, [chosenOtherSpecialisation, chosenPreferences, chosenSpecialisation]);
    
    useEffect(()=>{
       mentorPreferencesData(mentorPreferences)
    });

    
    return(
        <Box>
            <Container sx={{padding: '5%', gap: '30px', display: 'flex', flexDirection: 'column'}}>
                <div style={{ alignItems: 'center', gap: '3%'}}>
                    <Typography sx={{margin:'1%'}}>What type/s of mentee would you prefer?</Typography>
                    <MultipleSelector data={MenteeTypesData} dataStore={(data: []) => setChosenPreferences(data)}></MultipleSelector>
                </div>
                <div style={{ alignItems: 'center', gap: '3%'}}>
                    <Typography sx={{margin:'1%'}}>What industries or career transitions are you seeking mentorship?</Typography>
                    <MultipleSelector data={industrySectorData} dataStore={(data: []) => setChosenSpecialisation(data)}></MultipleSelector>
                </div>
                <div style={{ display: 'flex', gap: '3%'}}>
                    <Typography sx={{margin:'1%'}}>or other </Typography>
                    <TextField fullWidth label="More specific industries/careers"
                        onChange={(e)=> setChosenOtherSpecialisation(e.target.value)}/>
                </div>
            </Container>
        </Box>
    )
}

export default Preferences;