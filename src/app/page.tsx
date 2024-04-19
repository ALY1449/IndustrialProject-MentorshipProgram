"use client";

import React from "react";
import { Box } from "@mui/material";
import RootLayout from "./layout";
import DashboardComponent from "./dashboard/page";

const Home: React.FC = () => {
  return (
    <RootLayout>
      <Box>
        {/* <Container> */}
        {/* Render your components using the data fetched from Firebase */}
        {/* <MenteeMentorSelector /> */}
        {/* </Container> */}
        <DashboardComponent />
      </Box>
    </RootLayout>
  );
};

export default Home;
