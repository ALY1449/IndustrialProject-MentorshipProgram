'use client';

import { MentorPreferences } from "@/app/redux/features/registration/state/preferences/menteePreferences";
import { Box, Checkbox, Container, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Preferences: React.FC<ChildProps> = (props) =>{
    const [values, setValues]= useState<MentorPreferences>({
        undergrad_or_grad: undefined,
        postgrad: undefined,
        professional: undefined
    })

    const handleChange = (fieldName: keyof MentorPreferences, value: boolean) =>{
        setValues((prevValues)=>({
            ...prevValues,
            [fieldName]: value
        }))
    }

    useEffect(()=>{
        props.mentorPreferencesData(values);
    })
    
    return(
        <Box>
            <Container>
                <Typography sx={{margin:'1%'}}>What type/s of mentee would you prefer?</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={()=>handleChange('undergrad_or_grad',true)} />} label="Undergraduate/graduate" />
                    <FormControlLabel control={<Checkbox onChange={()=>handleChange('postgrad',true)}/>} label="Postgraduate" />
                    <FormControlLabel control={<Checkbox onChange={()=>handleChange('professional',true)}/>} label="Professional" />
                </FormGroup>
                <Typography sx={{margin:'1%'}}>What industries or career transitions are you seeking mentorship?</Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Engineering" />
                    <FormControlLabel control={<Checkbox />} label="Information Technology (IT) and CompSci" />
                    <FormControlLabel control={<Checkbox />} label="Professional" />
                </FormGroup>
            </Container>
        </Box>
    )
}

export default Preferences;