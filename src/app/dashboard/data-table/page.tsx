'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import { Button, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { useAppDispatch } from '@/app/redux/hooks';
import database from '@/app/firestore/firestore';
import { dashboardData } from '@/app/redux/features/registration/dashboardSlice';


const interface
const DataTable: React.FC<ChildProps> = (props) => {
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState('1');
  const [rows, setRows] = useState([]);

  const q = query(collection(database, "Mentees"), where("documentOf", "!=", null));

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(q);
      const newRows: ((prevState: never[]) => never[]) | { id: string; avatar: string; fullName: any; registeredOn: any; status: any; assignedMentor: any; participatingAs: string; actions: string | undefined; }[] = [];
      querySnapshot.forEach((doc, index) => {
        // Construct new data object
        const newData = {
          id: doc.data()['documentOf'] + '_' + index,
          avatar: 'G',
          fullName: doc.data()['documentOf'],
          registeredOn: doc.data()['createdAt'].toDate(),
          status: doc.data()['status'],
          assignedMentor: doc.data()['assignedMentor'], 
          participatingAs: 'Mentee', 
          actions: doc.data()['status'] == 'INCOMPLETE' ? 'Assign a mentor' : undefined
        };
        newRows.push(newData);
      });
      // Update the state with the new rows
      setRows(newRows);
  }

    fetchData(); // Call the async function
  }, [q]);


  const matchMentee = (mentee: string) => {
    props.allocateMentee(mentee);
    setTabValue('2');
  };

  useEffect(() => {
    props.changeTab(tabValue);
  }, [tabValue, props]); // Added props to the dependency array

  useEffect(() => {
    //dispatch(progressData());
  }, [dispatch]); // Added dispatch to the dependency array

  const columns: GridColDef[] = [
    { field: 'avatar', headerName: 'Avatar', width: 200, renderCell: (avatarIcon) => <Avatar />},
    { field: 'fullName', headerName: 'Full Name', width: 227 },
    { field: 'registeredOn', headerName: 'Registered On', width: 270 },
    {field: 'participatingAs', headerName: 'Participating as', width: 235, renderCell: (params) => <Chip label={params.value} />},
    { field: 'status', headerName: 'Status', width: 220, 
      renderCell: (params) => <Chip sx={{
        height: 'auto',
        '& .MuiChip-label': {
          backgroundColor: '#FFCCCC'
        },
      }} 
      label={params.value} />},
    { field: 'assignedMentor', headerName: 'Assigned Mentor', width: 220, renderCell: (params) => {
      const actions = params.row.actions;
      const menteeName = params.row.fullName;
      if (actions) {
        return (
          <Button variant="contained" value={menteeName} color="secondary" onClick={(e)=>matchMentee(e.currentTarget.value)}>
            {actions}
          </Button>
        );
      }
      return params.value;
    }},
  ];

  return (
    <div style={{ height: '100%', width: '100%', maxWidth: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row: dashboardData["home"]) =>  row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15]}
        rowSelection
        sx={{'& .MuiDataGrid-columnHeader': {backgroundColor:"#8F3880", width: '100%'}, 
        '& .MuiDataGrid-columnHeaderTitle  ': {color: 'white'}}}
      />
    </div>
  );
}
export default DataTable;
