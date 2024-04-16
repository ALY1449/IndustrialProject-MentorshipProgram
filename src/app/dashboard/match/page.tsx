"use client";

import { Box, Grid } from "@mui/material";
import MatchTableComponent from "../match-table/page";
import Results, { MatchRow } from "../results/page";
import { useEffect, useState } from "react";

interface MatchComponentProps {
  chosenMentee: string;
}
const MatchComponent: React.FC<MatchComponentProps> = ({ chosenMentee }) => {
  const [name, setName] = useState(chosenMentee);

  useEffect(() => {
    setName(chosenMentee);
  }, [chosenMentee]);

  const arr: MatchRow[] = [
    {
      name: "Ivan Dinglasan",
      participatingAs: "Mentee",
      skills: 30,
      goals: 20,
      personality: 50,
      percentage: 60,
      assignedMentor: "Mentor 1",
    },
    {
      name: "Mentee Alyssa Test",
      participatingAs: "Mentee",
      skills: 20,
      goals: 50,
      personality: 80,
      percentage: 90,
      assignedMentor: "Mentor 2",
    },
    {
      name: "Alyssa Pausanos",
      participatingAs: "Mentee",
      skills: 40,
      goals: 70,
      personality: 90,
      percentage: 30,
      assignedMentor: "Mentor 3",
    },
    {
      name: "testing",
      participatingAs: "Mentee",
      skills: 50,
      goals: 20,
      personality: 50,
      percentage: 80,
      assignedMentor: "Mentor 4",
    },
    {
      name: "Mentor 2 Full Name",
      participatingAs: "Mentor",
      skills: 20,
      goals: 40,
      personality: 80,
      percentage: 10,
      assignedMentor: "Mentor 5",
    },
    {
      name: "Mentor testing",
      participatingAs: "Mentor",
      skills: 20,
      goals: 40,
      personality: 50,
      percentage: 90,
      assignedMentor: "Mentor 6",
    },
    {
      name: "Mentor Name",
      participatingAs: "Mentor",
      skills: 20,
      goals: 40,
      personality: 50,
      percentage: 100,
      assignedMentor: "Mentor 7",
    },
    {
      name: "Mentor Name 3",
      participatingAs: "Mentor",
      skills: 20,
      goals: 40,
      personality: 50,
      percentage: 100,
      assignedMentor: "Mentor 7",
    },
    {
      name: "Mentor Name 4",
      participatingAs: "Mentor",
      skills: 20,
      goals: 40,
      personality: 50,
      percentage: 100,
      assignedMentor: "Mentor 7",
    },
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={name !== undefined ? 6 : 12}>
          {/* <DataTable/> */}
          <MatchTableComponent
            handleName={(data: string) => setName(data)}
            receivedName={name}
          />
        </Grid>
        <Grid item xs={name !== undefined ? 6 : 12}>
          {name !== undefined ? (
            <Results data={arr} dataOf={name} />
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MatchComponent;
