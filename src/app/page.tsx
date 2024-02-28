'use client';

import { Box, Button, Container, TextField } from '@mui/material'
import { useState } from 'react';
import Form from './form/form';

export default function Home() {

  return (
    <Box sx={{maxWidth:'80%', borderRadius: '50px', padding:'5%'}}>
          <Container fixed sx={{paddingRight:'50px'}}>
              <Form/>
          </Container>
    </Box>
  )
}
