"use client";

import * as React from "react";
import { RootState } from "@/app/redux/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/redux/hooks";
import { useSelector } from "react-redux";
import { FetchCollection } from "@/app/redux/features/registration/actions/dashboard/FetchCollection";
import { UpdateStatustoInProgress } from "@/app/redux/features/registration/actions/dashboard/UpdateStatustoInProgress";
import { HomeTableData } from "@/app/redux/features/registration/state/dashboard/home-table-data";
import { Status } from "@/app/redux/features/registration/state/dashboard/status/status";
import mentorpic from "../../../../public/pictures/mentorpic.png";
import BasicDateCalendar from "../calendar/calendar";
import PairingProgress from "../pairing-progress/page";
import PairingsMadeTracker from "../pairings-made-tracker/pairingsMadeTracker";
import dayjs, { Dayjs } from "dayjs";
import { FetchMenteesPairedOnThisDay } from "@/app/redux/features/registration/actions/dashboard/FetchMenteesPairedOnThisDay";

// Define the DataTableProps interface
export interface DataTableProps {
  changeTab: (data: string) => void;
  allocateMentee: (data: string) => void;
}

// Define the DataTable component
export default function DataTable({
  changeTab,
  allocateMentee,
}: DataTableProps) {
  const dispatch = useAppDispatch();
  const [noMentorsChecked, setNoMentorsChecked] = React.useState(false);
  const [noMenteesChecked, setNoMenteesChecked] = React.useState(false);
  const R = require("ramda");

  const handleNoMentorsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNoMentorsChecked(event.target.checked);
  };

  const handleNoMenteesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNoMenteesChecked(event.target.checked);
  };

  const mentorImageUrl = mentorpic.src;
  const [tabValue, setTabValue] = useState("1");
  const rows = useSelector((state: RootState) => state.dashboard.rows);
  const [chosenRowData, setChosenRowData] = useState<HomeTableData>();
  const [filteredRows, setFilteredRows] = useState<HomeTableData[]>(rows);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());

  const assignButton = (data: HomeTableData) => {
    setChosenRowData(data);
    dispatch(UpdateStatustoInProgress(data));
  };

  useEffect(() => {
    dispatch(FetchCollection());
  }, [dispatch]);

  useEffect(() => {
    if (noMentorsChecked && noMenteesChecked) {
      const newRows = rows.filter((data: HomeTableData) => {
        return data.status === Status.Incomplete;
      });
      setFilteredRows(newRows);
    } else if (noMentorsChecked) {
      const newRows = rows.filter((data: HomeTableData) => {
        return (
          data.participatingAs === "Mentee" && data.status === Status.Incomplete
        );
      });
      setFilteredRows(newRows);
    } else if (noMenteesChecked) {
      const newRows = rows.filter((data: HomeTableData) => {
        return (
          data.participatingAs === "Mentor" && data.status === Status.Incomplete
        );
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

  useEffect(() => {
    if (chosenRowData) {
      allocateMentee(chosenRowData.fullName);
    }
  }, [allocateMentee, chosenRowData]);

  useEffect(() => {
    changeTab(tabValue);
  }, [changeTab, tabValue]); // Added props to the dependency array

  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      renderCell: (avatarIcon) => <Avatar />,
    },
    { field: "fullName", headerName: "Full Name", width: 220 },
    { field: "registeredOn", headerName: "Registered On", width: 200 },
    {
      field: "participatingAs",
      headerName: "Participating as",
      width: 180,
      renderCell: (params) => (
        <Chip label={params.value} variant="outlined" color="secondary" />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <Chip
          color={
            params.value == Status.Completed
              ? "success"
              : params.value == Status.InProgress
              ? "warning"
              : "error"
          }
          label={params.value}
        />
      ),
    },
    { field: "pairedDuring", headerName: "Paired During", width: 200 },
    {
      field: "assignedMentor",
      headerName: "Assigned Mentor/Mentee",
      width: 220,
      renderCell: (params) => {
        const actions = params.value;
        if (actions !== "Mentor name") {
          if (actions !== "In progress") {
            return (
              <Button
                variant="contained"
                value={params.value}
                color="secondary"
                onClick={() => setTabValue("2")}
              >
                {actions}
              </Button>
            );
          } else {
            return <div></div>;
          }
        } else {
          return (
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Avatar /> {params.value}
            </div>
          );
        }
      },
    },
  ];

  return (
    <Box>
      <div style={{ display: "inline-flex", gap: 20, width: "100%" }}>
        <Paper elevation={3} sx={{ padding: 5, width: "40%" }}>
          <p>Hello, Admin</p>
          <CardMedia
            component="img"
            height="200"
            image={mentorImageUrl}
            alt="mentor pic"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setTabValue("2")}
          >
            Proceed to pairing
          </Button>
        </Paper>
        <BasicDateCalendar
          chosenDate={(date: Dayjs) => setSelectedDate(date)}
        />
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Typography>
            Pairing made during {selectedDate.format("dddd MMMM D, YYYY")}
          </Typography>
          <PairingsMadeTracker chosenDate={selectedDate} />
          <Typography>PROGRESS</Typography>
          <Paper elevation={3} sx={{ padding: 5 }}>
            <PairingProgress />
          </Paper>
        </Stack>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <Switch
          checked={noMentorsChecked}
          onChange={handleNoMentorsChange}
          inputProps={{ "aria-label": "controlled" }}
          color="secondary"
        />
        <Typography>No Mentors</Typography>
        <Switch
          checked={noMenteesChecked}
          onChange={handleNoMenteesChange}
          inputProps={{ "aria-label": "controlled" }}
          color="secondary"
        />
        <Typography>No Mentees</Typography>
      </div>
      <Paper elevation={3}>
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
            onCellClick={(e) =>
              e.field === "assignedMentor" && assignButton(e.row)
            }
            pageSizeOptions={[20, 25]}
            rowSelection
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#8F3880",
                width: "100%",
              },
              "& .MuiDataGrid-columnHeaderTitle  ": { color: "white" },
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
