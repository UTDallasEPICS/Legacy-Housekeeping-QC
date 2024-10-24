import { Alert, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { TeamMember } from "../../../../../ts/types/db.interfaces";
import { CleanType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { montserrat } from "../../../../theme";
import {
  getDateFilter,
  setInspectionsFetchData,
} from "../../../../../slices/inspectionsFetchSlice";
import { useDispatch, useSelector } from "react-redux";
import { splitInspectionWithStatus } from "../../../../../functions/splitInspectionWithStatus";
import TeamMemberMultiSelect from "../TeamMemberMultiSelect";
import CleanTypeRadioGroup from "../CleanTypeRadioGroup";
import {
  RoomOptionProps,
  BuildingOptionProps,
} from "../RoomDropdownSelect/props";
//import BuildingDropdownSelect from "../RoomDropdownSelect";
import { TeamMemberOptionProps } from "../TeamMemberMultiSelect/props";
import { verifyForm } from "./verifyForm";
import { InspectionPlannerProps } from "./props";
import BuildingDropdownSelect from "../RoomDropdownSelect/BuildingDropdownSelect";
import RoomDropdownSelect from "../RoomDropdownSelect/RoomDropdownSelect";

const InspectionPlanner = ({
  members,
  buildingsWithRooms,
  buildings,
}: InspectionPlannerProps) => {
  const dispatch = useDispatch();
  const dateFilter = useSelector(getDateFilter);
  const { data: session } = useSession();

  const [errors, setErrors] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<
    TeamMemberOptionProps[]
  >([]);
  const [selectedBuilding, setSelectedBuilding] =
    useState<BuildingOptionProps>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomOptionProps>(null);
  const [selectedCleanType, setSelectedCleanType] = useState<CleanType>(
    CleanType.NORMAL
  );

  useEffect(
    () => setErrors([]),
    [selectedMembers, selectedBuilding, selectedRoom, selectedCleanType]
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

    // Create a rubric for the inspection - default to Quantitative
    const rubricRes = await fetch("/api/rubric/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rubric_type: "Quantitative" }),
    });
    const rubric = await rubricRes.json();

    // Add default items to the rubric - which is specific to a quantitave rubric
    await fetch("/api/roomItem/addDefault", {
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
      const person_id = member.id;
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
        id: option.id,
        name: option.first_name + " " + option.last_name,
      };
    }
  );

  const buildingOptions: BuildingOptionProps[] = buildings.flatMap(
    (building) => {
      return {
        floor_number: building.floor_count,
        building_name: building.name,
        building_id: building.id,
      };
    }
  );

  const roomOptions: RoomOptionProps[] =
    buildingsWithRooms?.flatMap((building) => {
      return building.rooms.map((room) => {
        return {
          room_id: room.id,
          room_name: room.name,
          floor_number: room.floor_number,
          building_name: building.name,
        };
      });
    }) || [];

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

      <BuildingDropdownSelect
        options={buildingOptions}
        roomOptions={roomOptions}
        selected={selectedBuilding}
        handleChange={setSelectedBuilding}
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
