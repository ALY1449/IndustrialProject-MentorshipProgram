'use client'

import { Avatar, Box, Card, CircularProgress, Container, Grid, Paper } from "@mui/material"
import MatchTableComponent from "../match-table/page"
import Results from "../results/page"
import { useEffect, useState } from "react"
import { HomeTableData } from "@/app/redux/features/registration/state/dashboard/home-table-data"

const MatchComponent: React.FC<ChildProps> = (props) => {
    const [name, setName] = useState<HomeTableData>();

    useEffect(()=>{
        setName(props.chosenMentee);
    }, [props.chosenMentee])



    const arr = [
        {
            name: 'Ivan Dinglasan',
            skills: 30,
            goals: 20,
            personality: 50,
            percentage: 60,
            assignedMentor: 'Mentor 1'
        },
        {
            name: 'Mentee Alyssa Test',
            skills: 20,
            goals: 50,
            personality: 80,
            percentage: 90,
            assignedMentor: 'Mentor 2'
        },
        {
            name: 'Alyssa Pausanos',
            skills: 40,
            goals: 70,
            personality: 90,
            percentage: 30,
            assignedMentor: 'Mentor 3'
        },
        {
            name: 'testing',
            skills: 50,
            goals: 20,
            personality: 50,
            percentage: 80,
            assignedMentor: 'Mentor 4'
        },
        {
            name: 'Mentor 2 Full Name',
            skills: 20,
            goals: 40,
            personality: 80,
            percentage: 10,
            assignedMentor: 'Mentor 5'
        }
    ]

    useEffect(()=>{
        console.log("match page received name", name);
    }, [name])
    return(
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={name !== undefined ? 6 : 12}  >
                    {/* <DataTable/> */}
                    <MatchTableComponent handleName={(data: HomeTableData)=> setName(data)}/>
                </Grid>
                <Grid item xs={name !== undefined ? 6 : 12}>
                    {name !== undefined ? 
                        <Results data={arr} dataOf={name}/>
                        : <div></div>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default MatchComponent;