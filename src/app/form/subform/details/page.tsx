'use client';

import { Box, Checkbox, Container, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MentorProfessionalDetails } from "@/app/redux/features/registration/state/details/mentorDetails";
import IndustrySectorSelector from "./industrySectorSelector";

const Details: React.FC<ChildProps> = (props) => {
    const [industrySectorList, setIndustrySectorList]= React.useState<string[]>([]);
     const [mentorDetails, setMentorDetails] = useState<MentorProfessionalDetails>({
        jobTitle: '',
        industry: [],
        specialisation: ''
    });



    const handleChange = (fieldName: keyof MentorProfessionalDetails, value: string) => {
        setMentorDetails((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
    }

    useEffect(()=>{
        setMentorDetails((prevValues) => ({
            ...prevValues,
            industry: industrySectorList,
        }));
    },[industrySectorList]) 

    useEffect(()=>{
        props.mentorProfessionalDetailsData(mentorDetails);
    })
     
    return(
        <Box>
            <Container fixed>
                <div style={{display: 'flex', alignItems: 'center', gap: '11%'}}>
                    <Typography sx={{margin:'1%'}}>Job Title</Typography>
                    <TextField sx={{ m: 1, width: '35ch' }} onChange={(e)=> handleChange('jobTitle', e.target.value)}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '3%'}}>
                    <Typography sx={{margin:'1%'}}>Industry Sector</Typography>
                    <IndustrySectorSelector industrySectorList={(data: string[]) => setIndustrySectorList(data)}></IndustrySectorSelector>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '5%'}}>
                    <Typography sx={{margin:'1%'}}>Specialisation</Typography>
                    <TextField sx={{ m: 1, width: '35ch' }} onChange={(e)=> handleChange('specialisation', e.target.value)}/>
                </div>
            </Container>
        </Box>
    )
}

export default Details;