import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { InspectionCardProps } from "../../../../ts/interfaces/roomReport.interfaces";
import { useDispatch } from "react-redux";
import { setInspectionSelectionData } from "../../../../slices/inspectionSelectionSlice";
import { useRouter } from "next/router";

const UncompletedCard = ({
  card_id,
  inspectionProps,
}: {
  card_id: number;
  inspectionProps: InspectionCardProps;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClicked = () => {
    dispatch(
      setInspectionSelectionData({
        card_id: card_id,
        inspections: inspectionProps,
      })
    );
    router.push("/admin/makeInspection");
  };

  return (
    <Card sx={{ display: "flex", alignItems: "center" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          flex: 1,
        }}
      >
        <Typography variant="h6">
          <b>Room{" " + inspectionProps.room_name} </b>
        </Typography>
        <Typography noWrap variant="h6">
          Floor {inspectionProps.floor_number} in{" "}
          {inspectionProps.building_name} Building
        </Typography>
        <Typography noWrap>
          Cleaned by{" "}
          {inspectionProps.team_members
            .map((member) => member.first_name + " " + member.last_name)
            .join(", ")}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          ml: 0,
          minWidth: "fit-content",
          display: "flex",
          flexDirection: "column",
          alignSelf: "stretch",
        }}
      >
        <Box flexGrow={1} display={"flex"} alignItems={"center"}>
          <Typography fontSize={"24px"} fontWeight={"bold"}>
            {inspectionProps.score}%
          </Typography>
        </Box>
        <Button endIcon={<ArrowForwardIcon />} onClick={handleClicked}>
          Observe
        </Button>
      </CardActions>
    </Card>
  );
};
export default UncompletedCard;
