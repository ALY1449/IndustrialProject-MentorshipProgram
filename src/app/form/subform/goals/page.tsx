'use client';

import { Goals } from "@/app/redux/features/registration/state/goals/goals";
import { personalDetailsSelector } from "@/app/redux/selector";
import { RootState } from "@/app/redux/store";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface GoalsProps{
    goalsData: (data: Goals) => void
}

const GoalsComponent: React.FC<GoalsProps> = ({goalsData}) =>{
    const userState = useSelector(personalDetailsSelector);
    const goalsState = useSelector((state: RootState)=>state.registration.goals);
    const [preferredgoals, setPreferredGoals] = useState<Goals>({
        longTermGoal: goalsState.longTermGoal,
        firstShortTermGoal: goalsState.firstShortTermGoal,
        secondShortTermGoal: goalsState.secondShortTermGoal
    })

    const handleInputChange = (fieldName: keyof Goals, value: string) =>{
        setPreferredGoals((prevValues)=>({
            ...prevValues,
            [fieldName]: value
        }))
    }

    useEffect(()=>{
        goalsData(preferredgoals);
    })
    
    return(
        <Box>
            <Container sx={{ '& > div:not(:last-child)': { marginBottom: '20px' } }}>
                <Typography sx={{margin:'1%'}}>{userState.mentor ? "What is one long-term goal you prefer your mentee to have?" : "What is one long-term goal you have?"}</Typography>
                <TextField fullWidth helperText="e.g. To establish a successful tech startup" label="Long Term Goal" variant="outlined" onChange={(e)=> handleInputChange('longTermGoal', e.target.value)}/>
                <TextField fullWidth helperText="e.g.  To complete a front-end web certification course" label="First Short Term Goal" variant="outlined" onChange={(e)=> handleInputChange('firstShortTermGoal', e.target.value)}/>
                <TextField fullWidth helperText="e.g.  To improve interpersonal skills by next year" label="Second Short Term Goal" variant="outlined" onChange={(e)=> handleInputChange('secondShortTermGoal', e.target.value)}/>
            </Container>
        </Box>
    )
}
export default GoalsComponent;