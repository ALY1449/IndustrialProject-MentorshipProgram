'use client'

import { Box, Container } from "@mui/material"
import MultipleSelector from "../details/multipleSelector"
import { PersonalityTypeData } from "../../data/personalityTypeData"
import { useEffect, useState } from "react"
import { PersonalityType } from "@/app/redux/features/registration/state/personality-type/personalityType"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"

const PersonalityTypeComponent: React.FC<ChildProps>  = (props) =>{
    const personalityTypeState = useSelector((state: RootState)=> state.registration.personalityType);
    const [dataStore, setDataStore] = useState<PersonalityType>({
        personalityType: personalityTypeState.personalityType
    });

    useEffect(()=>{
        props.personalityType(dataStore);
    })

    return(
        <Box>
            <Container>
                <MultipleSelector data={PersonalityTypeData} dataStore={(data: PersonalityType) => setDataStore(data)}></MultipleSelector>
            </Container>
        </Box>
    )
}

export default PersonalityTypeComponent;