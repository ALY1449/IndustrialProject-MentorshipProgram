'use client';

import { Box, Checkbox, Container, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MentorProfessionalDetails } from "@/app/redux/features/registration/state/details/mentorDetails";
import MultipleSelector from "./multipleSelector";
import industrySectorData from "../../data/industrySectorData";

const Details: React.FC<ChildProps> = (props) => {
    const [dataStore, setDataStore]= React.useState<string[]>([]);
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
            industry: dataStore,
        }));
    },[dataStore]) 

    useEffect(()=>{
        props.mentorProfessionalDetailsData(mentorDetails);
    })

    return(
        <Box>
            <Container fixed sx={{padding: '5%'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '9%', flexWrap: 'wrap'}}>
                    <Typography sx={{margin:'1%'}}>Job Title</Typography>
                    <TextField sx={{ m: 1, width: '35ch' }} onChange={(e)=> handleChange('jobTitle', e.target.value)}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '4%', flexWrap: 'wrap'}}>
                    <Typography sx={{margin:'1%'}}>Industry Sector</Typography>
                    <MultipleSelector data={industrySectorData} dataStore={(data: string[]) => setDataStore(data)}></MultipleSelector>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '5%', flexWrap: 'wrap'}}>
                    <Typography sx={{margin:'1%'}}>Specialisation</Typography>
                    <TextField sx={{ m: 1, width: '35ch' }} onChange={(e)=> handleChange('specialisation', e.target.value)}/>
                </div>
            </Container>
        </Box>
    )
}

export default Details;