'use client';

import { Box, Container, TextField, Typography } from "@mui/material";
import { MentorSkills } from "@/app/redux/features/registration/state/skills/mentorSkills";
import { useEffect, useState } from "react";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

const Skills: React.FC<ChildProps> = (props) =>{
    const mentorState = useSelector((state: RootState)=> state.registration.mentorSkills);
    const [mentorSkills, setMentorSkills] = useState<MentorSkills>({
        firstBasicSkill: mentorState.firstBasicSkill,
        secondBasicSkill: mentorState.secondBasicSkill,
        thirdBasicSkill: mentorState.thirdBasicSkill,
        firstExpertSkill: mentorState.firstExpertSkill,
        secondExpertSkill: mentorState.secondExpertSkill,
        thirdExpertSkill: mentorState.thirdExpertSkill
    });

    const handleInputChange = (fieldName: keyof MentorSkills, value: string) =>{
        setMentorSkills((prevValues) =>({
            ...prevValues,
            [fieldName]: value
        }))
    }

    useEffect(()=>{
        props.mentorSkills(mentorSkills);
    })

    return(
        <Box>
            <Container>
                <Typography sx={{margin:'1%'}}>Three (3) basic skills</Typography>
                <TextField  helperText="e.g. Communication Skill" sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleInputChange('firstBasicSkill', e.target.value)} label="Basic Industry Skill"/>
                <TextField  helperText="e.g. Communication Skill" sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleInputChange('secondBasicSkill', e.target.value)} label="Basic Soft Skill"/>
                <TextField  helperText="e.g. Communication Skill" sx={{ m: 1, width: '25ch', marginBottom: '5%'}} onChange={(e)=> handleInputChange('thirdBasicSkill', e.target.value)} label="Basic Industy Skill"/>      
                <Typography sx={{margin:'1%'}}>Three (3) expert skills</Typography>
                <TextField  helperText="eg. Communication Skill" sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleInputChange('firstExpertSkill', e.target.value)} label="Expert Industry Skill"/>
                <TextField  helperText="eg. Communication Skill" sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleInputChange('secondExpertSkill', e.target.value)} label="Expert Soft Skill"/>
                <TextField  helperText="eg. Communication Skill" sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleInputChange('thirdExpertSkill', e.target.value)} label="Expert Industry Skill"/>
            </Container>
        </Box>
    )
}

export default Skills