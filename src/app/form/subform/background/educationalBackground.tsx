'use client';

import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MultipleSelector from "../details/multipleSelector";
import industrySectorData from "../../data/industrySectorData";
import React from "react";
import EducationalBackground from "@/app/redux/features/registration/state/background/educationalBackground";
import Programs from "../../data/programsData";

const EducationalBackgroundComponent: React.FC<ChildProps> = (props) => {

    const [educationalBackground, setEducationalBackground] = useState<EducationalBackground>({
        programs:[],
        majors: []
    });

    const [chosenPrograms, setChosenPrograms] =   React.useState([]);
    const [chosenMajors, setChosenMajors] =  React.useState([]);


    useEffect(() => {
        setEducationalBackground({
            programs: chosenPrograms,
            majors: chosenMajors
        });
    }, [chosenPrograms, chosenMajors]);

    useEffect(()=>{
        props.menteeEducationalBackgroundData(educationalBackground);
    })
    
    return(
        <Box>
            <Container>
                <Typography sx={{margin:'1%'}}>What program are you currently enrolled in?</Typography>
                <MultipleSelector data={Programs} dataStore={(data: []) => setChosenPrograms(data)}></MultipleSelector>
                <Typography sx={{margin:'1%'}}>What major/s are you currently enrolled in?</Typography>
                <MultipleSelector data={industrySectorData} dataStore={(data: []) => setChosenMajors(data)}></MultipleSelector>
            </Container>
        </Box>
    )
}

export default EducationalBackgroundComponent;