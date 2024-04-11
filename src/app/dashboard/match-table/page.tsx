'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { fetchMenteeCollection } from '@/app/redux/features/registration/dashboardSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { Status } from '@/app/redux/features/registration/state/dashboard/status/status';
import { Chip } from '@mui/material';
import { HomeTableData } from '@/app/redux/features/registration/state/dashboard/home-table-data';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function createData(
  avatar: string,
  fullName: string,
  status: Status,
  assignedMentor: string,
  participatingAs: string
) {
  return { avatar, fullName, status, assignedMentor, participatingAs};
}

interface MatchTableComponentProps{
  handleName: (data: string) => void
  receivedName: string
}

const MatchTableComponent: React.FC<MatchTableComponentProps> = ({handleName, receivedName}) => {
  const [rows, setRows] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const [chosenName, setChosenName] = useState(receivedName);
  const collectionData = useSelector((state: RootState)=> state.dashboard.rows)
  const R = require('ramda')

  useEffect(()=>{
    dispatch(fetchMenteeCollection());
  },[dispatch])

  useEffect(() => {
    // Map over the collectionData and create rows using createData function
    const updatedRows = collectionData.map((data) =>
      createData(data.avatar, data.fullName, data.status, data.assignedMentor, data.participatingAs)
    );

    const filterByStatus = R.filter((data: HomeTableData) => data.status == Status.Incomplete ||  data.status == Status.InProgress)
    setRows(filterByStatus((updatedRows)));
  }, [R, chosenName, collectionData]);

  useEffect(()=>{
    handleName(chosenName);
  },[chosenName, handleName]);
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%'}} aria-label="customized table">
        <TableHead sx={{width: '100%'}}>
          <TableRow>
            <StyledTableCell>Progress Status</StyledTableCell>
            <StyledTableCell >Avatar</StyledTableCell>
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell >Participating as</StyledTableCell>
            <StyledTableCell >Paired with</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => ( 
            <StyledTableRow key={row.fullName} onClick={() => setChosenName(row.fullName)} 
              sx={row.fullName == chosenName ? { '& .MuiTableCell-body': { backgroundColor: "#F4E6F2" } } : {backgroundColor: "white"}}>
              <StyledTableCell component="th" scope="row"> 
              {
                <Chip 
                color={row.status === Status.Completed ? "success" : (row.status === Status.InProgress ? "warning" : "error")}
                label={row.status} />
              }
              </StyledTableCell>
              <StyledTableCell >{row.avatar}</StyledTableCell>
              <StyledTableCell>{row.fullName}</StyledTableCell>
              <StyledTableCell>{row.participatingAs}</StyledTableCell>
              <StyledTableCell>{row.assignedMentor == 'In progress' ? '---': row.assignedMentor}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MatchTableComponent;