import { Alert, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { TeamMember } from "../../../../../ts/types/db.interfaces";
import { CleanType } from "@prisma/client";
import { BuildingWithRooms } from "../../../../../ts/interfaces/room.interface";
import { useSession } from "next-auth/react";
import { montserrat } from "../../../../theme";
import {
  getDateFilter,
  setInspectionsFetchData,
} from "../../Grid/inspectionsFetchSlice";
import { useDispatch, useSelector } from "react-redux";
import { splitInspectionWithStatus } from "../../splitInspectionWithStatus";
import TeamMemberMultiSelect from "../TeamMemberMultiSelect";
import RoomDropdownSelect from "../RoomDropdownSelect";
import CleanTypeRadioGroup from "../CleanTypeRadioGroup";
import { RoomOptionProps } from "../RoomDropdownSelect/props";
import { TeamMemberOptionProps } from "../TeamMemberMultiSelect/props";
import { verifyForm } from "./verifyForm";

export interface InspectionPlannerProps {
  members: TeamMember[];
  buildings: BuildingWithRooms[];
}

const InspectionPlanner = ({ members, buildings }: InspectionPlannerProps) => {
  const dispatch = useDispatch();
  const dateFilter = useSelector(getDateFilter);
  const { data: session } = useSession();

  const [errors, setErrors] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<
    TeamMemberOptionProps[]
  >([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomOptionProps>(null);
  const [selectedCleanType, setSelectedCleanType] = useState<CleanType>(
    CleanType.NORMAL
  );

  useEffect(
    () => setErrors([]),
    [selectedMembers, selectedRoom, selectedCleanType]
  );

  const handleSubmission = async () => {
    // Verify the form
    const result = verifyForm({
      selectedMembers,
      selectedRoom,
      selectedCleanType,
    });
    if (!result.isValid) {
      setErrors(result.messages);
      return;
    }

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
    const inspectionFetchRes = await fetch("/api/roomReport/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: dateFilter || new Date().toISOString(),
      }),
    });
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

  const memberOptions: TeamMemberOptionProps[] = members.map(
    (option: TeamMember) => {
      return {
        key: option.id,
        name: option.first_name + " " + option.last_name,
      };
    }
  );
  const roomOptions: RoomOptionProps[] = buildings.flatMap((building) => {
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

      {errors.map((error) => (
        <Alert
          severity="error"
          key={error}
          sx={{ fontFamily: montserrat.style.fontFamily }}
        >
          {error}
        </Alert>
      ))}

      <TeamMemberMultiSelect
        options={memberOptions}
        selected={selectedMembers}
        handleChange={setSelectedMembers}
      />

      <RoomDropdownSelect
        options={roomOptions}
        selected={selectedRoom}
        handleChange={setSelectedRoom}
      />

      <CleanTypeRadioGroup
        selected={selectedCleanType}
        handleChange={setSelectedCleanType}
      />

      <Button variant="outlined" onClick={handleSubmission}>
        CREATE
      </Button>
    </Box>
  );
};

export default InspectionPlanner;
