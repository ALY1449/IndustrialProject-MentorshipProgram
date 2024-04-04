'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import { Button, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/app/redux/hooks';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/app/redux/store';
import { fetchMenteeCollection } from '@/app/redux/features/registration/actions/actions';
import { HomeTableData } from '@/app/redux/features/registration/state/dashboard/home-table-data';
import { Status } from '@/app/redux/features/registration/state/dashboard/status/status';


const DataTable: React.FC<ChildProps> = (props) => {
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState('1');
  const rows = useSelector((state: RootState)=> state.dashboard.rows);
  const [chosenRowData, setChosenRowData] = useState<HomeTableData>(); 

  useEffect(()=>{
    dispatch(fetchMenteeCollection());
  },[])

  
  useEffect(()=>{
    props.allocateMentee(chosenRowData)
  },[chosenRowData, props])


  useEffect(() => {
    props.changeTab(tabValue);
  }, [tabValue, props]); // Added props to the dependency array


  const columns: GridColDef[] = [
    { field: 'avatar', headerName: 'Avatar', width: 200, renderCell: (avatarIcon) => <Avatar />},
    { field: 'fullName', headerName: 'Full Name', width: 227 },
    { field: 'registeredOn', headerName: 'Registered On', width: 270 },
    {field: 'participatingAs', headerName: 'Participating as', width: 235, 
    renderCell: (params) => <Chip label={params.value} variant="outlined" color= "secondary" />},
    { field: 'status', headerName: 'Status', width: 220, 
      renderCell: (params) => <Chip 
      color= {params.value == Status.Completed ? "success" : "error"}
      label={params.value} />},
    { field: 'assignedMentor', headerName: 'Assigned Mentor/Mentee', width: 220, renderCell: (params) => {
      const actions = params.value;
      if (actions !== "Mentor Name") {
        return (
          <Button variant="contained" value={params.value} color="secondary" onClick={()=> setTabValue('2')} >
            {actions}
          </Button>
        );
      }
      return (<div style={{display:'flex', alignItems:'center', gap: '20px'}}><Avatar /> {params.value}</div>);
    }},
  ];

  return (
    <div style={{ height: '100%', width: '100%', maxWidth: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        onCellClick={(e)=> e.field === 'action' ?  setChosenRowData(e.row) : console.log("none")}
        pageSizeOptions={[20, 25]}
        rowSelection
        sx={{'& .MuiDataGrid-columnHeader': {backgroundColor:"#8F3880", width: '100%'}, 
        '& .MuiDataGrid-columnHeaderTitle  ': {color: 'white'}}}
      />
    </div>
  );
}
export default DataTable;
