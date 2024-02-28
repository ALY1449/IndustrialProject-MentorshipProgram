'use client';

import { MentorPreferredGoals } from "@/app/redux/features/registration/state/goals/mentorPreferredGoals";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

const Goals: React.FC<ChildProps> = (props) =>{

    const [preferredgoals, setPreferredGoals] = useState<MentorPreferredGoals>({
        longTermGoal: '',
        firstShortTermGoal: '',
        secondShortTermGoal: ''
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
        <div>
            <TextField label="Long Term Goal" variant="outlined" onChange={(e)=> handleInputChange('longTermGoal', e.target.value)}/>
            <TextField label="First Short Term Goal" variant="outlined" onChange={(e)=> handleInputChange('firstShortTermGoal', e.target.value)}/>
            <TextField label="Second Short Term Goal" variant="outlined" onChange={(e)=> handleInputChange('secondShortTermGoal', e.target.value)}/>
        </div>
    )
}
export default Goals;