import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const DataTable: React.FC<ChildProps> = (props) => {
  const [tabValue, setTabValue] = useState('1');

  const matchMentee = (mentee: string) =>{
    props.allocateMentee(mentee);
    setTabValue('2');
  }
  useEffect(()=>{
    props.changeTab(tabValue);
  },[tabValue]);

  
  const columns: GridColDef[] = [
    { field: 'avatar', headerName: 'Avatar', width: 200, renderCell: () => <Avatar/>},
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
    { id: 'H', avatar: 'H', fullName: 'Alyssa', registeredOn: '1/01/24', status: 'COMPLETED', assignedMentor: 'Mentor 1'},
    { id: 'R', avatar: 'H', fullName: 'Ann', registeredOn: '1/01/24', status: 'COMPLETED', assignedMentor: 'Mentor 2'},
    { id: 'A', avatar: 'H', fullName: 'Grace', registeredOn: '1/01/24', status: 'INCOMPLETE', actions: 'ASSIGN A MENTOR'}
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