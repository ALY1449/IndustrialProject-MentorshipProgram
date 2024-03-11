'use client';

import { UserState } from "@/app/redux/features/registration/state/user/user";
import { Box, Container, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { RootState } from "@/app/redux/store";
import { ChildProps } from "postcss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MenteeDetails: React.FC<ChildProps> = (props) =>{
    const mentorState = useSelector((state: RootState)=> state.registration.user.mentor);
    const menteeState = useSelector((state: RootState)=> state.registration.user.mentee);

    const [values, setValues] = useState<UserState>({
        fullName: '',
        age: 0,
        phoneNumber: '',
        gender: '',
        birthdate: new Date(),
        emailAddress: '',
        password: '',
        mentor: mentorState,
        mentee: menteeState,
        undergrad_or_grad: undefined,
        postgrad: undefined,
        professional: undefined
    });

    const handleChange = (fieldName: keyof UserState, value: boolean) => { 
        setValues((prevValues)=>({
            ...prevValues,
            [fieldName]: value
        }))
    }

    return(
        <div>
            <Typography sx={{margin:'1%', paddingTop:'10px'}}>What is your current education/career stage?</Typography>
                <RadioGroup
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{margin:'1%'}}
                 >
                <FormControlLabel value="undergradorgrad" control={<Radio onChange={() => handleChange('undergrad_or_grad', true)}/>} label="Undergraduate/Graduate" />
                <FormControlLabel value="postgrad" control={<Radio onChange={() => handleChange('postgrad', true)}/>} label="Post Graduate" />
                <FormControlLabel value="professional" control={<Radio onChange={() => handleChange('professional', true)}/>} label="Professional" />
                </RadioGroup>
        </div>
    )
}

export default MenteeDetails;