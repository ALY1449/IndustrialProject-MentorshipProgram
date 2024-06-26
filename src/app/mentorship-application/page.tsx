'use client';

import { Box, Container, Typography, CardActionArea, CardMedia, Grid} from "@mui/material";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import mentorpic from '../../../public/pictures/mentorpic.png'
import menteepic from '../../../public/pictures/menteepic.jpeg'
import { useRouter } from 'next/navigation'
import { UserState } from "../redux/features/registration/state/user/user";
import { createAnAccount } from "../redux/features/registration/registrationSlice";
import { useAppDispatch } from "../redux/hooks";

const MenteeMentorSelector = () =>{
    const dispatch = useAppDispatch();
    const mentorImageUrl = mentorpic.src;
    const menteeImageUrl = menteepic.src;
    const router = useRouter();

    const [values, setValues] = useState<UserState>({
        fullName: '',
        age: 0,
        emailAddress: '',
        mentor: undefined,
        mentee: undefined,
        currentStage: ''
    });


    const handleClick = (fieldName: keyof UserState, value: boolean) =>{
        setValues((prevValues)=>({
            ...prevValues,
            [fieldName]: value
        }));

        router.push('/form');
    }

    useEffect(()=>{
        dispatch(createAnAccount(values));
    },[dispatch, values]);

    return(
        <Box>
            <Container fixed>
                <Typography sx={{margin:'1%'}} variant="h3">Joining as a </Typography>
                <Grid container spacing={2} >
                    <Grid item  xs={12} sm={6}  >
                        <Card sx={{ width: '100%', maxWidth: '100%'}} onClick={() => handleClick('mentor', true)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image= {mentorImageUrl}
                                    alt="mentor pic"
                                />
                                <CardContent sx={{textAlign:'center'}}>
                                    <Typography sx={{margin:'1%'}} variant="h5">As a Mentor</Typography>
                                </CardContent>
                                </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}  >
                        <Card sx={{ width: '100%', maxWidth: '100%' }} onClick={() => handleClick('mentee', true)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={menteeImageUrl}
                                    alt="green iguana"
                                />
                                <CardContent sx={{textAlign:'center'}}>
                                    <Typography sx={{margin:'1%'}} variant="h5">As a Mentee</Typography>
                                </CardContent>
                                </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default MenteeMentorSelector;
