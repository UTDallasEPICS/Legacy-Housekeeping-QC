import { Alert, Box, Button, Card, Typography } from "@mui/material";
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
import RoomDropdownSelect from "../RoomDropdownSelect";
import CleanTypeRadioGroup from "../CleanTypeRadioGroup";
import {
  RoomOptionProps,
  BuildingOptionProps,
} from "../RoomDropdownSelect/props";
import { TeamMemberOptionProps } from "../TeamMemberMultiSelect/props";
import { verifyForm } from "./verifyForm";
import { InspectionPlannerProps } from "./props";
import { DashboardCardHeading } from "../../..";
import BuildingDropdownSelect from "../RoomDropdownSelect/BuildingDropDownSelect";

const InspectionPlanner = ({
  members,
  buildings,
  floors,
}: InspectionPlannerProps) => {
  const dispatch = useDispatch();
  const dateFilter = useSelector(getDateFilter);
  const { data: session } = useSession();

  const [errors, setErrors] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<
    TeamMemberOptionProps[]
  >([]);
  const [roomOptions, setRoomOptions] = useState<RoomOptionProps[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<RoomOptionProps[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomOptionProps>(null);
  const [selectedCleanType, setSelectedCleanType] = useState<CleanType>(
    CleanType.NORMAL
  );

  //The data of all the rooms, will be modified by the building dropdown select into the selected rooms and passed to the room dropdown select to get sleected room
  const originOptions: RoomOptionProps[] = buildings.flatMap((building) => {
    return building.rooms.map((room) => {
      return {
        room_id: room.id,
        room_name: room.name,
        floor_number: room.floor_number,
        building_name: building.name,
      };
    });
  });

  //Sets the selected rooms to origin options immediately
  useEffect(() => {
    setSelectedRooms(originOptions);
  }, []);

  useEffect(
    () => setErrors([]),
    [selectedMembers, selectedRoom, selectedCleanType, selectedRooms]
  );

  useEffect(() => {
    setRoomOptions(selectedRooms);
  }, [selectedRooms, buildings]); // Dependency array

  //Sets the room options back to the original options
  const onClick = () => {
    setRoomOptions(originOptions);
    console.log(floors);
  };

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
      console.log("Selected Member: ", member);
      const person_id = String(member.id);
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
        inspector_email: session?.user?.email,
      }),
    });
    const inspectionData = await inspectionRes.json();
    console.log("Inspection Data", inspectionData);

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
        id: String(option.id),
        name: option.first_name + " " + option.last_name,
      };
    }
  );

  const buildingOptions: BuildingOptionProps[] = floors.map((building) => {
    return {
      building_id: building.id,
      building_name: building.name,
      floor_number: building.floor_count,
    };
  });

  return (
    <Card
      sx={
        {
          // Prevents the box from shrinking and growing by the content
        }
      }
    >
      <Box>
        <DashboardCardHeading text="Inspection Planner" />
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

      <Box
        sx={{
          padding: 2,
          borderBottom: "1px solid #E0E0E0",
          minWidth: "400px",
          maxWidth: "400px",

          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TeamMemberMultiSelect
          options={memberOptions}
          selected={selectedMembers}
          handleChange={setSelectedMembers}
        />

        <BuildingDropdownSelect
          options={buildingOptions}
          roomOptions={originOptions}
          selected={null}
          handleChange={setSelectedRooms}
        />

        <RoomDropdownSelect
          options={roomOptions}
          selected={selectedRoom}
          handleChange={setSelectedRoom}
        />

        <Button variant="outlined" onClick={onClick}>
          Reset Room Options
        </Button>

        <CleanTypeRadioGroup
          selected={selectedCleanType}
          handleChange={setSelectedCleanType}
        />

        <Button variant="outlined" onClick={handleSubmission}>
          CREATE
        </Button>
      </Box>
    </Card>
  );
};

export default InspectionPlanner;
