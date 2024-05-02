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
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { TeamMember } from "../../../../ts/types/db.interfaces";
import { CleanType } from "@prisma/client";
import { BuildingWithRooms } from "../../../../ts/interfaces/room.interface";
import { useSession } from "next-auth/react";
import { montserrat } from "../../../theme";
import {
  getDateFilter,
  setInspectionsFetchData,
} from "../../../../slices/inspectionsFetchSlice";
import { useDispatch, useSelector } from "react-redux";
import { splitInspectionWithStatus } from "../../../../functions/splitInspectionWithStatus";

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
    const rubricRes = await fetch("/api/rubric/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rubric_type: "Quantitative" }),
    });
    const rubric = await rubricRes.json();

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

    const scheduleRes = await fetch(
      "http://localhost:3000/api/scheduling/scheduleRoom",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start_time: dateFilter ? dateFilter : new Date().toISOString(),
          end_time: dateFilter ? dateFilter : new Date().toISOString(),
          clean_type: selectedCleanType,
          room_id: selectedRoom.room_id,
        }),
      }
    );
    const scheduleData = await scheduleRes.json();

    selectedMembers.forEach((member) => {
      const person_id = member.key;
      const schedule_id = scheduleData.id;
      fetch("http://localhost:3000/api/scheduling/addTeamMemberToSchedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          person_id,
          schedule_id,
        }),
      });
    });

    const inspectionRes = await fetch(
      "http://localhost:3000/api/scheduling/createInspection",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schedule_id: scheduleData.id,
          rubric_id: rubric.id,
          inspector_id: session?.user?.id,
        }),
      }
    );
    const inspectionData = await inspectionRes.json();
    console.log(inspectionData);

    const inspectionFetchRes = await fetch(
      "http://localhost:3000/api/roomReport/report",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: dateFilter ? dateFilter : new Date().toISOString(),
        }),
      }
    );
    const inspectionFetch = await inspectionFetchRes.json();
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
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        minWidth: "400px",
        maxWidth: "400px",
        flexBasis: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
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

      <FormControl fullWidth variant="standard">
        <Autocomplete
          limitTags={2}
          multiple
          disableCloseOnSelect
          options={memberOptions}
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
            <MenuItem {...props} key={option.key}>
              {option.name}
              {selected && <CheckIcon color="info" />}
            </MenuItem>
          )}
          renderTags={(tagValue, getTagProps) => {
            return tagValue.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                label={<EllipsisText width="60px">{option.name}</EllipsisText>}
              />
            ));
          }}
          isOptionEqualToValue={(option, value) => option.key === value.key}
          value={selectedMembers}
          onChange={(event, value) => setSelectedMembers(value)}
        />
      </FormControl>

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
            <Container key={params.key} disableGutters>
              <ListSubheader
                sx={{
                  backgroundColor: "lightgray",
                  fontWeight: "bold",
                }}
              >
                {params.group}
              </ListSubheader>
              <Grid style={{ padding: 0 }}>{params.children}</Grid>
            </Container>
          )}
          isOptionEqualToValue={(option, value) =>
            option.room_id === value.room_id
          }
          value={selectedRoom}
          onChange={(event, value) => setSelectedRoom(value)}
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

const CHIP_MAX_WIDTH = 200;

const EllipsisText = (props) => {
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
