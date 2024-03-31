'use client';

import { Box, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { Skills } from "@/app/redux/features/registration/state/skills/skills";
import { BasicSkills } from "@/app/redux/features/registration/state/skills/basicSkills";
import { ExpertSkills } from "@/app/redux/features/registration/state/skills/expertSkills";

const SkillsComponent: React.FC<ChildProps> = (props) =>{
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

    const [skills, setSkills] = useState<Skills>({
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
        setSkills({basicSkills, expertSkills})
    }, [basicSkills, expertSkills])

    useEffect(()=>{
        props.skills(skills);
    })

    return(
        <Box>
            <Container sx={{padding: '5%', gap: '30px'}}>
                <div>
                    <Typography sx={{margin:'1%', fontWeight: 'bold'}}>Three (3) basic skills</Typography>
                    <TextField  helperText="e.g. Communication Skill" sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleSoftBasicInputChange('firstBasicIndustrySkill', e.target.value)} label="Basic Industry Skill"/>
                    <TextField  helperText="e.g. Communication Skill" sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleSoftBasicInputChange('firstBasicSoftSkill', e.target.value)} label="Basic Soft Skill"/>
                    <TextField  helperText="e.g. Communication Skill" sx={{ m: 1, width: '25ch', marginBottom: '5%'}} onChange={(e)=> handleSoftBasicInputChange('secondBasicIndustrySkill', e.target.value)} label="Basic Industy Skill"/>      
                </div>
                <div>
                    <Typography sx={{margin:'1%', fontWeight: 'bold'}}>Three (3) expert skills</Typography>
                    <TextField  helperText="eg. Communication Skill" sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleExpertInputChange('firstExpertIndustrySkill', e.target.value)} label="Expert Industry Skill"/>
                    <TextField  helperText="eg. Communication Skill" sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleExpertInputChange('firstExpertSoftSkill', e.target.value)} label="Expert Soft Skill"/>
                    <TextField  helperText="eg. Communication Skill" sx={{ m: 1, width: '25ch' }} onChange={(e)=> handleExpertInputChange('secondExpertIndustrySkill', e.target.value)} label="Expert Industry Skill"/>
                </div>
            </Container>
        </Box>
    )
}

export default SkillsComponent;