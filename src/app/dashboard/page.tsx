'use client'
import { Typography } from "@mui/material";
import DataTable from "./data-table/page";
import LabTabs from "./tabs/page";

const DashboardComponent: React.FC<ChildProps> = () => {
    return( 
        <div>
            <Typography>MENTORSHIP PAIRING PROGRESS DASHBOARD</Typography>
            <LabTabs/>
        </div>
    )
}

export default DashboardComponent;