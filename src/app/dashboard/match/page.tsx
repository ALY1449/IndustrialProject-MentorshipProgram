'use client'

import { Avatar, Box, Card, CircularProgress, Container, Grid, Paper } from "@mui/material"
import MatchTableComponent from "../match-table/page"
import Results from "../results/page"
import { useEffect, useState } from "react"

const MatchComponent: React.FC<ChildProps> = ({chosenMentee}) => {
    const [name, setName] = useState("");

    useEffect(()=>{
        if(chosenMentee){
            setName(chosenMentee)
        }
        else{
            setName("");
        }
    }, [chosenMentee])

    useEffect(()=>{
        console.log("name", name)
    }, [name])

    const arr = [
        {
            name: 'Alyssa',
            skills: 30,
            goals: 20,
            personality: 50,
            percentage: 60
        },
        {
            name: 'Ann',
            skills: 20,
            goals: 50,
            personality: 80,
            percentage: 90
        },
        {
            name: 'Chachot',
            skills: 40,
            goals: 70,
            personality: 90,
            percentage: 30
        },
        {
            name: 'Ivan',
            skills: 50,
            goals: 20,
            personality: 50,
            percentage: 80
        },
        {
            name: 'Matthew',
            skills: 20,
            goals: 40,
            personality: 80,
            percentage: 10
        }
    ]

    useEffect(()=>{
        console.log(name);
    }, [name])
    return(
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6}  >
                    {/* <DataTable/> */}
                    <MatchTableComponent handleName={(data: string)=> setName(data)}/>
                </Grid>
                <Grid item xs={6}>
                    <Results data={arr} dataOf={name}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MatchComponent;