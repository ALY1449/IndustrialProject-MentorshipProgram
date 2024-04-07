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
import { fetchMenteeCollection } from '@/app/redux/features/registration/actions/actions';
import { useAppDispatch } from '@/app/redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { Status } from '@/app/redux/features/registration/state/dashboard/status/status';
import { Chip } from '@mui/material';

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
  progressStatus: Status,
  avatar: string,
  name: string,
  mentor: string
) {
  return { progressStatus, avatar, name,mentor};
}

const MatchTableComponent: React.FC<ChildProps> = (props) => {
  const [rows, setRows] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const [chosenName, setChosenName] = useState("");
  const collectionData = useSelector((state: RootState)=> state.dashboard.rows)

  useEffect(()=>{
    dispatch(fetchMenteeCollection());
  },[dispatch])

  useEffect(() => {
    // Map over the collectionData and create rows using createData function
    const updatedRows = collectionData.map((data) =>
      createData(data.status, data.avatar, data.fullName, data.assignedMentor)
    );
    setRows(updatedRows);
  }, [collectionData]); // Update rows when collectionData changes

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
              <StyledTableCell component="th" scope="row"> 
              {
                <Chip 
                color= {row.progressStatus == Status.Completed ? "success" : "error"}
                label={row.progressStatus} />
              }
              </StyledTableCell>
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