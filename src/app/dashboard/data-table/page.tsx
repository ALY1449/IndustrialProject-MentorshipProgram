'use client'
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { progressData } from '@/app/redux/features/registration/dashboardSlice';

const app = initializeApp({
  apiKey: "AIzaSyD34-PzQb_WxlQvRrt8a2vH5oUzmr0CzKk",
  authDomain: "mentorshipapplicationform.firebaseapp.com",
  projectId: "mentorshipapplicationform",
  storageBucket: "mentorshipapplicationform.appspot.com",
  messagingSenderId: "664284335203",
  appId: "1:664284335203:web:459803b8dc8a1a6574bc56"
});

const DataTable: React.FC<ChildProps> = (props) => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState('1');

  const db = getFirestore(app);
  const docRef = doc(db, "mentor", "Alyssa Pausanos"); //read from alyssa collection in mentor page

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(docRef);
      try {
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData(); // Call the async function
  }, [docRef]);

  const matchMentee = (mentee: string) =>{
    props.allocateMentee(mentee);
    setTabValue('2');
  }

  useEffect(()=>{
    props.changeTab(tabValue);
  },[tabValue]);


  useEffect(()=>{
    //dispatch(progressData());
  })
  
  const columns: GridColDef[] = [
    { field: 'avatar', headerName: 'Avatar', width: 200, renderCell: (avatarIcon) => <Avatar />},
    { field: 'fullName', headerName: 'Full Name', width: 227 },
    { field: 'registeredOn', headerName: 'Registered On', width: 220 },
    { field: 'status', headerName: 'Status', width: 220, 
      renderCell: (params) => 
      <Button color={params.value === 'COMPLETED' ? 'success' : 'error'}>{params.value} </Button> },
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

  const rows = [
    { id: 'A', avatar: 'A', fullName: 'Alyssa', registeredOn: '1/01/24', status: 'COMPLETED', assignedMentor: 'Mentor 1'},
    { id: 'B', avatar: 'H', fullName: 'Ann', registeredOn: '1/01/24', status: 'INCOMPLETE', actions: 'ASSIGN A MENTOR'},
    { id: 'C', avatar: 'H', fullName: 'Chachot', registeredOn: '1/01/24', status: 'INCOMPLETE', actions: 'ASSIGN A MENTOR'},
    { id: 'D', avatar: 'B', fullName: 'Ivan', registeredOn: '1/01/24', status: 'COMPLETED', assignedMentor: 'Mentor 3'},
    { id: 'E', avatar: 'H', fullName: 'Matthew', registeredOn: '1/01/24', status: 'COMPLETED', assignedMentor: 'Mentor 4'},
    { id: 'F', avatar: 'H', fullName: 'Freddy', registeredOn: '1/01/24', status: 'COMPLETED', assignedMentor: 'Mentor 5'}
  ];
  return (
    <div style={{ height: 400, width: '100%', maxWidth: '83.2%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        rowSelection
        sx={{'& .MuiDataGrid-columnHeader': {backgroundColor:"#8F3880"}, 
        '& .MuiDataGrid-columnHeaderTitle  ': {color: 'white'}}}
      />
    </div>
  );
}
export default DataTable;