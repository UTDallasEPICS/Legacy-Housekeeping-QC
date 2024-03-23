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
import { RubricType } from "@prisma/client";
import { BuildingWithRooms } from "../../../../ts/interfaces/room.interface";

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
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomSelectionProps>({
    room_id: -1,
    room_name: "",
    building_name: "",
  });
  const [selectedRubrics, setSelectedRubrics] = useState<RubricType>(
    RubricType.QUANTITATIVE
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

  const handleRubricChange = (event: SelectChangeEvent<RubricType>) => {
    setSelectedRubrics(event.target.value as RubricType);
  };

  const handleSubmission = () => {
    console.log(selectedMembers, selectedRoom, selectedRubrics);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4">Inspection Planner</Typography>
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

      <FormControl fullWidth variant="standard">
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
            &nbsp;
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
        <RadioGroup row value={selectedRubrics} onChange={handleRubricChange}>
          {Object.values(RubricType).map((rubric) => (
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
