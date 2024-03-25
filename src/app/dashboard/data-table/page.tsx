'use client'
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import database from '@/app/firestore/firestore';

const DataTable: React.FC<ChildProps> = (props) => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState('1');
  const [rows, setRows] = useState([]);

  const q = query(collection(database, "Mentees"), where("documentOf", "!=", null));

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(q);
      const newRows = [];
      querySnapshot.forEach((doc, index) => {
        // Construct new data object
        const newData = {
          id: doc.data()['documentOf'] + '_' + index,
          avatar: 'G',
          fullName: doc.data()['documentOf'],
          registeredOn: doc.data()['createdAt'].toDate(),
          status: doc.data()['status'],
          assignedMentor: doc.data()['assignedMentor']
        };
        newRows.push(newData);
      });
      // Update the state with the new rows
      setRows(newRows);
    };

    fetchData(); // Call the async function
  }, [q]);


  const matchMentee = (mentee: string) => {
    props.allocateMentee(mentee);
    setTabValue('2');
  };

  useEffect(() => {
    props.changeTab(tabValue);
  }, [tabValue]);

  useEffect(() => {
    //dispatch(progressData());
  });
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

  return (
    <div style={{ height: 400, width: '100%', maxWidth: '83.2%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15]}
        rowSelection
        sx={{'& .MuiDataGrid-columnHeader': {backgroundColor:"#8F3880"}, 
        '& .MuiDataGrid-columnHeaderTitle  ': {color: 'white'}}}
      />
    </div>
  );
}
export default DataTable;