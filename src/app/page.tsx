'use client';

import { Box, Container } from '@mui/material'
import MenteeMentorSelector from './mentorship-application/page';

export default function Home() {
  return (
      <Box sx={{maxWidth:'80%', borderRadius: '50px', padding:'5%'}}>
            <Container fixed sx={{paddingRight:'50px', backgroundColor: "pink"}}>
              <MenteeMentorSelector />
                {/* <Form/> */}
            </Container>
      </Box>
  )
}
