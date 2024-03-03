'use client';

import { MentorPreferredGoals } from "@/app/redux/features/registration/state/goals/mentorPreferredGoals";
import { RootState } from "@/app/redux/store";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Goals: React.FC<ChildProps> = (props) =>{
    const mentorState = useSelector((state: RootState)=>state.registration.mentorPreferredGoals);
    const [preferredgoals, setPreferredGoals] = useState<MentorPreferredGoals>({
        longTermGoal: mentorState.longTermGoal,
        firstShortTermGoal: mentorState.firstShortTermGoal,
        secondShortTermGoal: mentorState.secondShortTermGoal
    })

    const handleInputChange = (fieldName: keyof MentorPreferredGoals, value: string) =>{
        setPreferredGoals((prevValues)=>({
            ...prevValues,
            [fieldName]: value
        }))
    }

    useEffect(()=>{
        props.mentorGoals(preferredgoals);
    })
    
    return(
        <Box>
            <Container sx={{ '& > div:not(:last-child)': { marginBottom: '20px' } }}>
                <Typography sx={{margin:'1%'}}>What is one long-term goal you prefer your mentee to have?</Typography>
                <TextField fullWidth helperText="e.g. I want blah" label="Long Term Goal" variant="outlined" onChange={(e)=> handleInputChange('longTermGoal', e.target.value)}/>
                <TextField fullWidth helperText="e.g. I want blah" label="First Short Term Goal" variant="outlined" onChange={(e)=> handleInputChange('firstShortTermGoal', e.target.value)}/>
                <TextField fullWidth helperText="e.g. I want blah" label="Second Short Term Goal" variant="outlined" onChange={(e)=> handleInputChange('secondShortTermGoal', e.target.value)}/>
            </Container>
        </Box>
    )
}
export default Goals;