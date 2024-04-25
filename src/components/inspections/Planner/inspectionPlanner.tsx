import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  ListSubheader,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { TeamMember } from "../../../../ts/types/db.interfaces";
import { CleanType } from "@prisma/client";
import { BuildingWithRooms } from "../../../../ts/interfaces/room.interface";
import { useSession } from "next-auth/react";
import { montserrat } from "../../../../pages/theme";
import {
  getDateFilter,
  setInspectionsFetchData,
} from "../../../../slices/inspectionsFetchSlice";
import { useDispatch, useSelector } from "react-redux";
import { splitInspectionWithStatus } from "../../../../functions/splitInspectionWithStatus";
import { create } from "domain";

export interface InspectionPlannerProps {
  members: TeamMember[];
  buildings: BuildingWithRooms[];
}

interface TeamMemberSelectionProps {
  key: number;
  name: string;
}

interface RoomSelectionProps {
  room_id: number;
  room_name: string;
  building_name: string;
}

const ROOM_OPTIONS_LIMIT = 100;

const InspectionPlanner = ({ members, buildings }: InspectionPlannerProps) => {
  const dispatch = useDispatch();
  const dateFilter = useSelector(getDateFilter);
  const { data: session } = useSession();

  const [selectedMembers, setSelectedMembers] = useState<
    TeamMemberSelectionProps[]
  >([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomSelectionProps>(null);
  const [selectedCleanType, setSelectedCleanType] = useState<CleanType>(
    CleanType.NORMAL
  );

  const handleSubmission = async () => {
    // Create a rubric for the inspection
    const rubricRes = await fetch("/api/rubric/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rubric_type: "Quantitative" }),
    });
    const rubric = await rubricRes.json();

    // Add default items to the rubric
    const itemsRes = await fetch("/api/roomItem/addDefault", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: selectedRoom.room_id,
        rubric_id: rubric.id,
      }),
    });

    // Schedule the room for cleaning
    const scheduleRes = await fetch("/api/scheduling/scheduleRoom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start_time: dateFilter || new Date().toISOString(),
        end_time: dateFilter || new Date().toISOString(),
        clean_type: selectedCleanType,
        room_id: selectedRoom.room_id,
      }),
    });
    const scheduleData = await scheduleRes.json();

    // Add team members to the schedule
    selectedMembers.forEach((member) => {
      const person_id = member.key;
      const schedule_id = scheduleData.id;
      fetch("/api/scheduling/addTeamMemberToSchedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          person_id,
          schedule_id,
        }),
      });
    });

    // Create an inspection for the room
    const inspectionRes = await fetch("/api/scheduling/createInspection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        schedule_id: scheduleData.id,
        rubric_id: rubric.id,
        inspector_id: session?.user?.id,
      }),
    });
    const inspectionData = await inspectionRes.json();
    console.log(inspectionData);

    // Fetch the modified inspection data
    const inspectionFetchRes = await fetch(
      "http://localhost:3000/api/roomReport/report",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: dateFilter || new Date().toISOString(),
        }),
      }
    );
    const inspectionFetch = await inspectionFetchRes.json();

    // Update the inspection data in the slice to reflect in grid
    const { inspected, notInspected } =
      splitInspectionWithStatus(inspectionFetch);
    dispatch(
      setInspectionsFetchData({
        inspected: inspected,
        notInspected: notInspected,
      })
    );
  };

  const memberOptions: TeamMemberSelectionProps[] = members.map(
    (option: TeamMember) => {
      return {
        key: option.id,
        name: option.first_name + " " + option.last_name,
      };
    }
  );
  const roomOptions: RoomSelectionProps[] = buildings.flatMap((building) => {
    return building.rooms.map((room) => {
      return {
        room_id: room.id,
        room_name: room.name,
        building_name: building.name,
      };
    });
  });

  return (
    <Box
      sx={{
        padding: 2,
        // Prevents the box from shrinking and growing by the content
        minWidth: "400px",
        maxWidth: "400px",

        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: "30",
            fontWeight: "bold",
            fontFamily: montserrat.style.fontFamily,
          }}
        >
          Inspection Planner
        </Typography>
      </Box>

      <TeamMemberMultiSelect
        options={memberOptions}
        selected={selectedMembers}
        handleChange={setSelectedMembers}
      />

      <FormControl variant="standard">
        <Autocomplete
          options={roomOptions}
          getOptionLabel={(option) =>
            option.room_id === -1
              ? ""
              : "Room " + option.room_name + " in " + option.building_name
          }
          groupBy={(option) => option.building_name + " Building"}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                variant="standard"
                placeholder="Type a room name"
                label="Select a room"
              />
            );
          }}
          renderOption={(props, option, { selected }) => (
            <MenuItem {...props} key={option.room_id}>
              {"Room " + option.room_name}
              {selected && <CheckIcon color="info" />}
            </MenuItem>
          )}
          renderGroup={(params) => (
            <li key={params.key}>
              <Box
                sx={{
                  backgroundColor: "lightgray",
                  fontWeight: "bold",
                  padding: "0.5rem",
                }}
              >
                {params.group}
              </Box>
              <ul style={{ padding: 0 }}>{params.children}</ul>
            </li>
          )}
          isOptionEqualToValue={(option, value) =>
            option.room_id === value.room_id
          }
          value={selectedRoom}
          onChange={(event, value) => setSelectedRoom(value)}
          filterOptions={createFilterOptions({
            limit: ROOM_OPTIONS_LIMIT,
          })}
          PaperComponent={({ children }) => {
            return (
              <Paper>
                {children}
                <Box sx={{ padding: "1rem", backgroundColor: "lightgray" }}>
                  <Typography textAlign={"center"} fontStyle={"italic"}>
                    ... {roomOptions.length - ROOM_OPTIONS_LIMIT} more rooms.
                    Please type to search
                  </Typography>
                </Box>
              </Paper>
            );
          }}
        />
      </FormControl>

      <FormControl sx={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
        <FormLabel
          sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
        >
          Clean Type
        </FormLabel>
        <RadioGroup
          row
          value={selectedCleanType}
          onChange={(event) =>
            setSelectedCleanType(event.target.value as CleanType)
          }
        >
          {Object.values(CleanType).map((type) => (
            <FormControlLabel
              key={type}
              value={type}
              control={<Radio />}
              label={type[0] + type.slice(1).toLowerCase()}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Button variant="outlined" onClick={handleSubmission}>
        CREATE
      </Button>
    </Box>
  );
};

const TeamMemberMultiSelect = ({ options, selected, handleChange }) => (
  <FormControl fullWidth variant="standard">
    <Autocomplete
      limitTags={2}
      multiple
      disableCloseOnSelect
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="standard"
            placeholder="Name"
            label="Select team members"
          />
        );
      }}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          key={option.key}
          sx={{ display: "flex", gap: "1rem" }}
        >
          {option.name}
          {selected && <CheckIcon color="info" />}
        </MenuItem>
      )}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            label={
              <EllipsisTextChip width="60px">{option.name}</EllipsisTextChip>
            }
          />
        ));
      }}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      value={selected}
      onChange={(event, value) => handleChange(value)}
    />
  </FormControl>
);

const EllipsisTextChip = (props) => {
  const { children, width } = props;

  return (
    <div
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: width,
        fontFamily: montserrat.style.fontFamily,
      }}
    >
      {children}
    </div>
  );
};

export default InspectionPlanner;
