'use client'
import React, { useEffect, useState } from 'react';
import MenteeMentorSelector from './mentorship-application/page';
import { Box, Container } from '@mui/material';

const Home = () => {

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
