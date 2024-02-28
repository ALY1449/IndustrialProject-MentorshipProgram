'use client';

import { Box, Container, TextField, Typography } from "@mui/material";
import { MentorSkills } from "@/app/redux/features/registration/state/skills/mentorSkills";
import { useEffect, useState } from "react";

const BasicSkills: React.FC<ChildProps> = (props) =>{

    const [mentorSkills, setMentorSkills] = useState<MentorSkills>({
        firstBasicSkill: '',
        secondBasicSkill: '',
        thirdBasicSkill: '',
        firstExpertSkill: '',
        secondExpertSkill: '',
        thirdExpertSkill: ''
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
            <Container fixed>
                <Typography sx={{margin:'1%'}}>Three (3) basic skills</Typography>
                <TextField  sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleInputChange('firstBasicSkill', e.target.value)}/>
                <TextField sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleInputChange('secondBasicSkill', e.target.value)}/>
                <TextField  sx={{ m: 1, width: '25ch', marginBottom: '5%'}} onChange={(e)=> handleInputChange('thirdBasicSkill', e.target.value)}/>      
                <Typography sx={{margin:'1%'}}>Three (3) expert skills</Typography>
                <TextField  sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleInputChange('firstExpertSkill', e.target.value)}/>
                <TextField  sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleInputChange('secondExpertSkill', e.target.value)}/>
                <TextField  sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleInputChange('thirdExpertSkill', e.target.value)}/>
            </Container>
        </Box>
    )
}

export default BasicSkills