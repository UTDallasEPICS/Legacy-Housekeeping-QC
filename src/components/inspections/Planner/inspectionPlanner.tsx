import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  ListSubheader,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { TeamMember } from "../../../../ts/types/db.interfaces";
import { CleanType } from "@prisma/client";
import { BuildingWithRooms } from "../../../../ts/interfaces/room.interface";
import { useSession } from "next-auth/react";
import { montserrat } from "../../../../pages/theme";
import { setInspectionsFetchData } from "../../../../slices/inspectionsFetchSlice";
import { useDispatch } from "react-redux";
import { splitInspectionWithStatus } from "../../../../functions/splitInspectionWithStatus";

export interface InspectionPlannerProps {
  members: TeamMember[];
  buildings: BuildingWithRooms[];
}

interface RoomSelectionProps {
  room_id: number;
  room_name: string;
  building_name: string;
}

const InspectionPlanner = ({ members, buildings }: InspectionPlannerProps) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomSelectionProps>({
    room_id: -1,
    room_name: "",
    building_name: "",
  });
  const [selectedCleanType, setSelectedCleanType] = useState<CleanType>(
    CleanType.NORMAL
  );

  const handleMemberChange = (event) => {
    setSelectedMembers(event.target.value);
  };

  const handleRoomChange = (event: SelectChangeEvent<RoomSelectionProps>) => {
    const selectedRoom = event.target.value;
    console.log(selectedRoom);
    setSelectedRoom(
      typeof selectedRoom === "string"
        ? {
            room_id: parseInt(selectedRoom.split(":")[0]) || 0,
            room_name: selectedRoom.split(":")[1] || "",
            building_name: selectedRoom.split(":")[2] || "",
          }
        : selectedRoom
    );
  };

  const handleCleanTypeChange = (event: SelectChangeEvent<CleanType>) => {
    setSelectedCleanType(event.target.value as CleanType);
  };

  const handleSubmission = async () => {
    const scheduleRes = await fetch(
      "http://localhost:3000/api/scheduling/scheduleRoom",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start_time: new Date().toISOString(),
          end_time: new Date().toISOString(),
          clean_type: selectedCleanType,
          room_id: selectedRoom.room_id,
        }),
      }
    );
    const scheduleData = await scheduleRes.json();

    selectedMembers.forEach((member) => {
      const person_id = parseInt(member.split(":")[0]);
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
          room_id: selectedRoom.room_id,
          inspector_id: session?.user?.id,
        }),
      }
    );
    const inspectionData = await inspectionRes.json();

    const inspectionFetchRes = await fetch(
      "http://localhost:3000/api/roomReport/report",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        alignSelf: "start",
        width: "min-content",
      }}
    >
      <Box
        sx={{ display: "flex", width: "max-content", justifyContent: "center" }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { sm: 20, md: 30 },
            fontWeight: "bold",
            fontFamily: montserrat.style.fontFamily,
          }}
        >
          Inspection Planner
        </Typography>
      </Box>

      <FormControl fullWidth variant="standard">
        <InputLabel>Select team members</InputLabel>
        <Select
          multiple
          value={selectedMembers}
          onChange={handleMemberChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((member: string) => {
                const memberName = member.split(":")[1];
                return <Chip key={memberName} label={memberName} />;
              })}
            </Box>
          )}
        >
          {members.map((option: TeamMember) => (
            <MenuItem
              key={option.id}
              value={
                option.id + ":" + option.first_name + " " + option.last_name
              }
            >
              {option.first_name + " " + option.last_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="standard">
        <InputLabel>Select a room</InputLabel>
        <Select
          value={selectedRoom}
          onChange={handleRoomChange}
          renderValue={(selected) =>
            selected.room_id == -1
              ? ""
              : "Room " + selected.room_name + " in " + selected.building_name
          }
        >
          <MenuItem key={-1} value={"-1:"}>
            No room selected
          </MenuItem>
          {buildings.map((building) => {
            return [
              <ListSubheader
                sx={{
                  backgroundColor: "lightgray",
                  fontWeight: "bold",
                }}
              >
                {"Building " + building.name}
              </ListSubheader>,
              building.rooms.map((room) => (
                <MenuItem
                  key={room.id}
                  value={room.id + ":" + room.name + ":" + building.name}
                >
                  {"Room " + room.name}
                </MenuItem>
              )),
            ];
          })}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Rubric</FormLabel>
        <RadioGroup
          row
          value={selectedCleanType}
          onChange={handleCleanTypeChange}
        >
          {Object.values(CleanType).map((rubric) => (
            <FormControlLabel
              key={rubric}
              value={rubric}
              control={<Radio />}
              label={rubric[0] + rubric.slice(1).toLowerCase()}
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

export default InspectionPlanner;
