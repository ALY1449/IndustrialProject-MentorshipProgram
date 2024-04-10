'use client';

import React from 'react';
import { Box } from '@mui/material';
import DashboardComponent from './dashboard/page';

const Home: React.FC = () => {
  return (
    <Box>
      {/* <Container> */}
        {/* Render your components using the data fetched from Firebase */}
        {/* <MenteeMentorSelector /> */}
      {/* </Container> */}
      <DashboardComponent/>
    </Box>
  );
};

export default Home;
