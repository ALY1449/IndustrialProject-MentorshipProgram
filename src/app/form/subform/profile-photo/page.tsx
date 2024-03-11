'use client'

import { Box, Button, Container, Typography } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ProfilePhotoComponent: React.FC<ChildProps> = (props) =>{
    return(
        <Box>
            <Container sx={{padding: '5%', gap: '30px', display: 'flex', flexDirection: 'column'}}>
                <Typography>Please upload a recent photo of yourself</Typography>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload file
                <input
                    type="file"
                    hidden
                />
                </Button>
            </Container>
        </Box>
    )
}

export default ProfilePhotoComponent;