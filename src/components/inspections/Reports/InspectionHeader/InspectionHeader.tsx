import { Stack, Typography } from "@mui/material";
import { InspectionHeaderProps } from "./props";
import BackButton from "../../../globalComponents/backButton";

const InspectionHeader = (props: InspectionHeaderProps) => {
  const { room_name, floor_number, building_name, team_members, inspected } =
    props;
  return (

    <Stack spacing="0rem" flexDirection="column">
      <Typography
        variant="h3"
        align="center"
        color="primary"
        textTransform="capitalize"
        fontWeight="bold"
      >
        Inspection {inspected ? "Maker" : "Report"}
      </Typography>

      <Typography variant="h6" align="center" color="primary">
        <b>Room</b> {room_name} on <b>Floor</b> {floor_number} in{" "}
        <b>{building_name} Building</b>
      </Typography>

      <Typography variant="h6" align="center" color="primary">
        Cleaned by{" "}
        {team_members
          .map((member) => member.first_name + " " + member.last_name)
          .join(", ")}
      </Typography>
    </Stack>
  );
};

export default InspectionHeader;
