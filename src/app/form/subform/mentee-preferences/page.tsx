'use client'
import MenteePreferences from "@/app/redux/features/registration/state/preferences/menteePreferences";
import { Box, Container, Typography } from "@mui/material";
import MultipleSelector from "../details/multipleSelector";
import MentorTypesData from "../../data/mentorTypesData";
import React, { useEffect } from "react";

const MenteePreferencesComponent: React.FC<ChildProps> = (props) => {
    const [data, setDataStore]= React.useState<string[]>([]);
    
    useEffect(()=>{
        props.mentorPreferencesData(data)
    })
    
    return(
        <Box>
            <Container>
                <div style={{ alignItems: 'center', gap: '3%'}}>
                    <Typography sx={{margin:'1%'}}>What type/s of mentor would you prefer?</Typography>
                    <MultipleSelector data={MentorTypesData} dataStore={(data: string[]) => setDataStore(data)}></MultipleSelector>
                </div>
            </Container>
        </Box>
    )
}

export default MenteePreferencesComponent;