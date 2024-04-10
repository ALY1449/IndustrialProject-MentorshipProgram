'use client';

import * as React from 'react';
import { RootState } from '@/app/redux/store';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import { Box, Button, Chip, Switch, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/app/redux/hooks';
import { useSelector } from 'react-redux';
import { fetchMenteeCollection,updateDocInProgressStatus } from '@/app/redux/features/registration/dashboardSlice';
import { HomeTableData } from '@/app/redux/features/registration/state/dashboard/home-table-data';
import { Status } from '@/app/redux/features/registration/state/dashboard/status/status';
import PairingProgress from '../pairing-progress/page';

interface DataTableProps{
  changeTab: (data: string) => void;
  allocateMentee: (data: string) => void;
}

export default function DataTable({changeTab, allocateMentee}: DataTableProps){
  const dispatch = useAppDispatch();
  const [noMentorsChecked, setNoMentorsChecked] = React.useState(false);
  const [noMenteesChecked, setNoMenteesChecked] = React.useState(false);
  const R = require('ramda')

  const handleNoMentorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoMentorsChecked(event.target.checked);
  };

  const handleNoMenteesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoMenteesChecked(event.target.checked);
  };


  const [tabValue, setTabValue] = useState('1');
  const rows = useSelector((state: RootState)=> state.dashboard.rows);
  const [chosenRowData, setChosenRowData] = useState<HomeTableData>(); 
  const [filteredRows, setFilteredRows] = useState<HomeTableData[]>(rows);


  useEffect(()=>{
    dispatch(fetchMenteeCollection());
  },[dispatch])

  const assignButton = (data:HomeTableData ) =>{
    setChosenRowData(data);
    dispatch(updateDocInProgressStatus(data));
  }

  useEffect(() => {
    if (noMentorsChecked && noMenteesChecked) {
      const newRows = rows.filter((data: HomeTableData) => {
        return data.status === Status.Incomplete;
      });
      setFilteredRows(newRows);
    } else if (noMentorsChecked) {
      const newRows = rows.filter((data: HomeTableData) => {
        return data.participatingAs === "Mentee" && data.status === Status.Incomplete;
      });
      setFilteredRows(newRows);
    } else if (noMenteesChecked) {
      const newRows = rows.filter((data: HomeTableData) => {
        return data.participatingAs === "Mentor" && data.status === Status.Incomplete;
      });
      setFilteredRows(newRows);
    } else {
      const sortByStatus = R.sortBy((item: HomeTableData) => {
        if (item.status === Status.InProgress) {
          return 0; // "In Progress" comes first
        } else if (item.status === Status.Incomplete) {
          return 1; // "Incomplete" comes after "In Progress"
        }
        return 2; // Other statuses come last
      });
    
      // Sort the array using the custom sorting function
      const sortedData = sortByStatus(rows);
      setFilteredRows(sortedData);
    }
  }, [R, noMenteesChecked, noMentorsChecked, rows]);
  
  
  useEffect(()=>{
    if(chosenRowData){
      allocateMentee(chosenRowData.fullName)
    }
  },[allocateMentee, chosenRowData])


  useEffect(() => {
    changeTab(tabValue);
  }, [changeTab, tabValue]); // Added props to the dependency array



  const columns: GridColDef[] = [
    { field: 'avatar', headerName: 'Avatar', width: 200, renderCell: (avatarIcon) => <Avatar />},
    { field: 'fullName', headerName: 'Full Name', width: 227 },
    { field: 'registeredOn', headerName: 'Registered On', width: 270 },
    {field: 'participatingAs', headerName: 'Participating as', width: 235, 
    renderCell: (params) => <Chip label={params.value} variant="outlined" color= "secondary" />},
    { field: 'status', headerName: 'Status', width: 220, 
      renderCell: (params) => <Chip 
      color= {params.value == Status.Completed ? "success" : (params.value == Status.InProgress) ? "warning" : "error"}
      label={params.value} />},
    { field: 'assignedMentor', headerName: 'Assigned Mentor/Mentee', width: 220, renderCell: (params) => {
      const actions = params.value;
      if (actions !== "Mentor name") {
        if (actions !== "In progress") {
          return(<Button variant="contained" value={params.value} color="secondary" onClick={()=> setTabValue('2')} >
              {actions}
            </Button>)
        }
        else{
          return(<div></div>)
        }
      }
      else{
        return (<div style={{display:'flex', alignItems:'center', gap: '20px'}}><Avatar /> {params.value}</div>);
      }
    }},
  ];

  return (
    <Box>
      <PairingProgress/>
        <div style={{display: 'flex', alignItems:'center', justifyContent: 'right'}}>
          <Switch checked={noMentorsChecked} onChange={handleNoMentorsChange} inputProps={{ 'aria-label': 'controlled' }}color="secondary" />
          <Typography>No Mentors</Typography>
          <Switch checked={noMenteesChecked} onChange={handleNoMenteesChange} inputProps={{ 'aria-label': 'controlled' }}color="secondary" />
          <Typography>No Mentees</Typography>
        </div>
        <div style={{ height: '100%', width: '100%', maxWidth: '100%' }}>
        {filteredRows.length === 0 ? (
            <div>No results</div>
          ) : (
            <DataGrid
              rows={filteredRows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 20 },
                },
              }}
              onCellClick={(e)=> e.field === 'assignedMentor' && assignButton(e.row)}
              pageSizeOptions={[20, 25]}
              rowSelection
              sx={{'& .MuiDataGrid-columnHeader': {backgroundColor:"#8F3880", width: '100%'}, 
              '& .MuiDataGrid-columnHeaderTitle  ': {color: 'white'}}}
            />
          )}
      </div>
    </Box>
  );
}
