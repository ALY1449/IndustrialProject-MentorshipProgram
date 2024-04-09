'use client'
import MenteePreferences from "@/app/redux/features/registration/state/preferences/menteePreferences";
import { Box, Container, Typography } from "@mui/material";
import MultipleSelector from "../details/multipleSelector";
import MentorTypesData from "../../data/mentorTypesData";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface MenteePreferencesDataProps{
    menteePreferencesData: (data: MenteePreferences) => void; 
}
const MenteePreferencesComponent: React.FC<MenteePreferencesDataProps> = ({menteePreferencesData}) => {
    const menteePreferencesState = useSelector((state: RootState)=> state.registration.menteePreferences);
    const [menteePreferences, setMenteePreferences] = useState<MenteePreferences>({
        preferences:menteePreferencesState.preferences
    });

    const [chosenPreferences, setChosenPreferences] = React.useState<[]>([]);

    useEffect(() => {
        setMenteePreferences({
            preferences: chosenPreferences
        })
    }, [chosenPreferences]);
    
    useEffect(()=>{
        menteePreferencesData(menteePreferences)
    })
    
    return(
        <Box>
            <Container>
                <div style={{ alignItems: 'center', gap: '3%'}}>
                    <Typography sx={{margin:'1%'}}>What type/s of mentor would you prefer?</Typography>
                    <MultipleSelector data={MentorTypesData} dataStore={(data: []) => setChosenPreferences(data)}></MultipleSelector>
                </div>
            </Container>
        </Box>
    )
}

export default MenteePreferencesComponent;