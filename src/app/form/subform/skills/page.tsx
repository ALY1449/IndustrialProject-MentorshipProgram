'use client';

import { Box, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { Skills } from "@/app/redux/features/registration/state/skills/skills";
import { BasicSkills } from "@/app/redux/features/registration/state/skills/basicSkills";
import { ExpertSkills } from "@/app/redux/features/registration/state/skills/expertSkills";


interface SkillsProps{
    skills: (data: Skills) => void
}
const SkillsComponent: React.FC<SkillsProps> = ({skills}) =>{
    const skillState = useSelector((state: RootState)=> state.registration.skills);

    const [basicSkills, setBasicSkills] = useState<BasicSkills>({
        firstBasicSoftSkill: skillState.basicSkills.firstBasicSoftSkill,
        firstBasicIndustrySkill:  skillState.basicSkills.firstBasicIndustrySkill,
        secondBasicIndustrySkill: skillState.basicSkills.secondBasicIndustrySkill
    })

    const [expertSkills, setExpertSkills] = useState<ExpertSkills>({
        firstExpertSoftSkill: skillState.expertSkills.firstExpertSoftSkill,
        firstExpertIndustrySkill:  skillState.expertSkills.firstExpertIndustrySkill,
        secondExpertIndustrySkill: skillState.expertSkills.secondExpertIndustrySkill
    })

    const [userSkills, setUserSkills] = useState<Skills>({
        basicSkills: basicSkills,
        expertSkills: expertSkills
    })

    const handleSoftBasicInputChange = (fieldName: keyof BasicSkills, value: string) =>{
        setBasicSkills((prevValues) =>({
            ...prevValues,
        [fieldName]: value
        }))
    }

    const handleExpertInputChange = (fieldName: keyof ExpertSkills, value: string) =>{
        setExpertSkills((prevValues) =>({
            ...prevValues,
        [fieldName]: value
        }))
    }

    useEffect(()=>{
        setUserSkills({basicSkills, expertSkills})
    }, [basicSkills, expertSkills])

    useEffect(()=>{
        skills(userSkills);
    })

    return(
        <Box>
            <div>
                <Container sx={{ '& > div:not(:last-child)': { marginBottom: '30px' }}}>
                        <Typography sx={{margin:'1%', fontWeight: 'bold', marginBottom: '5%'}}>Three (3) basic skills</Typography>
                        <TextField fullWidth helperText="e.g. Communication Skill"  onChange={(e)=> handleSoftBasicInputChange('firstBasicIndustrySkill', e.target.value)} label="Basic Industry Skill"/>
                        <TextField fullWidth helperText="e.g. Active Listening" onChange={(e)=> handleSoftBasicInputChange('firstBasicSoftSkill', e.target.value)} label="Basic Soft Skill"/>
                        <TextField sx={{ marginBottom: '5%'}} fullWidth helperText="e.g. Event Planning" onChange={(e)=> handleSoftBasicInputChange('secondBasicIndustrySkill', e.target.value)} label="Basic Industy Skill"/>      
                </Container>
                <Container sx={{ '& > div:not(:last-child)': { marginBottom: '30px' }}}>
                    <Typography sx={{margin:'1%', fontWeight: 'bold', marginBottom: '5%'}}>Three (3) expert skills</Typography>
                    <TextField fullWidth helperText="eg. Conflict Resolution"  onChange={(e)=> handleExpertInputChange('firstExpertIndustrySkill', e.target.value)} label="Expert Industry Skill"/>
                    <TextField fullWidth helperText="eg. Cloud Computing" onChange={(e)=> handleExpertInputChange('firstExpertSoftSkill', e.target.value)} label="Expert Soft Skill"/>
                    <TextField  sx={{ marginBottom: '5%'}} fullWidth helperText="eg. Product Management" onChange={(e)=> handleExpertInputChange('secondExpertIndustrySkill', e.target.value)} label="Expert Industry Skill"/>
                </Container>
            </div>
        </Box>
    )
}

export default SkillsComponent;