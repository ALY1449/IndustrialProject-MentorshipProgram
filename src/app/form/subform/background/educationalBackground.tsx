'use client';

import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import MultipleSelector from "../details/multipleSelector";
import industrySectorData from "../../data/industrySectorData";
import React from "react";
const EducationalBackground: React.FC<ChildProps> = (props) => {
    const [enrolledProgram, setEnrolledProgram] = useState();
    const [dataStore, setDataStore] = React.useState<string[]>([]);

    return(
        <Box>
            <Container>
                <Typography sx={{margin:'1%'}}>What program are you currently enrolled in?</Typography>
                <MultipleSelector data={industrySectorData} dataStore={(data: string[]) => setDataStore(data)}></MultipleSelector>
                <Typography sx={{margin:'1%'}}>What major/s are you currently enrolled in?</Typography>
                <MultipleSelector data={industrySectorData} dataStore={(data: string[]) => setDataStore(data)}></MultipleSelector>
            </Container>
        </Box>
    )
}

export default EducationalBackground;