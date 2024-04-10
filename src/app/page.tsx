'use client'
import React from 'react';
import { Box, Container } from '@mui/material';
import MenteeMentorSelector from './mentorship-application/page';

const Home: React.FC = () => {
  return (
    <Box>
      <Container>
        {/* Render your components using the data fetched from Firebase */}
        <MenteeMentorSelector />
      </Container>
    </Box>
  );
};

export default Home;
