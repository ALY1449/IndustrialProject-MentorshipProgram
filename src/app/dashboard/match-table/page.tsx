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

enum progressStatus {
    Completed = 'Completed',
    InProgress = 'In Progress',
    Unassigned = 'Assign a mentor'
  };

function createData(
  progressStatus: progressStatus,
  avatar: string,
  name: string,
  mentor: string
) {
  return { progressStatus, avatar, name,mentor};
}

const rows = [
  createData(progressStatus.Completed, 'Avatar', 'Alyssa', 'Alan'),
  createData(progressStatus.Completed, 'Avatar', 'Ann', 'Mentor2'),
  createData(progressStatus.InProgress, 'Avatar', 'Grace', 'Mentor 3'),
];

const MatchTableComponent: React.FC<ChildProps> = (props) => {
  const [chosenName, setChosenName] = useState("");

  useEffect(()=>{
    props.handleName(chosenName);
  },[chosenName]);
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500}} aria-label="customized table">
        <TableHead sx={{width: '100%'}}>
          <TableRow>
            <StyledTableCell>Progress Status</StyledTableCell>
            <StyledTableCell >Avatar</StyledTableCell>
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell >Mentor</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => ( 
            <StyledTableRow key={row.name} onClick={() => setChosenName(row.name)}>
              <StyledTableCell component="th" scope="row">{row.progressStatus}</StyledTableCell>
              <StyledTableCell >{row.avatar}</StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.mentor}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MatchTableComponent;