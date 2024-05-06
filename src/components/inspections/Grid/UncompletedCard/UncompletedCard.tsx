import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  InspectionCardProps,
  toUncompletedInspectionCardProps,
} from "../props";
import { useDispatch } from "react-redux";
import { setInspectionSelectionData } from "../../inspectionSelectionSlice";
import { useRouter } from "next/router";
import { Inspection } from "../../../../../ts/types/db.interfaces";

const UncompletedCard = ({
  card_id,
  inspection,
}: {
  card_id: number;
  inspection: Inspection;
}) => {
  const inspectionProps: InspectionCardProps =
    toUncompletedInspectionCardProps(inspection);
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
        <Typography noWrap variant="h6">
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
      <CardActions sx={{ ml: 0, minWidth: "fit-content" }}>
        <Button endIcon={<ArrowForwardIcon />} onClick={handleClicked}>
          Inspect
        </Button>
      </CardActions>
    </Card>
  );
};
export default UncompletedCard;
