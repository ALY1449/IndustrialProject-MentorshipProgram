'use client';

import { Typography } from "@mui/material";
import LabTabs from "./tabs/page";

const DashboardComponent: React.FC = () => {
    return( 
        <div>
            <Typography>MENTORSHIP PAIRING PROGRESS DASHBOARD</Typography>
            <LabTabs/>
        </div>
    )
}

export default DashboardComponent;