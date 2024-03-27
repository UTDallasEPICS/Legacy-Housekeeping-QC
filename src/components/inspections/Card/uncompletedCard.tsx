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
import { UncompletedInspectionCardProps } from "../../../../ts/interfaces/roomReport.interfaces";
import { useDispatch } from "react-redux";
import { setInspectionSelectionData } from "../../../../slices/inspectionSelectionSlice";

const UncompletedCard = ({
  card_id,
  inspectionProps,
}: {
  card_id: number;
  inspectionProps: UncompletedInspectionCardProps;
}) => {
  const dispatch = useDispatch();
  const handleClicked = () => {
    dispatch(
      setInspectionSelectionData({
        card_id: card_id,
        inspections: inspectionProps,
      })
    );
  };

  return (
    <Card>
      <Box sx={{ display: "inline-flex", width: "fill", alignItems: "center" }}>
        <CardContent sx={{ width: "180px", mr: 0 }}>
          <Typography variant="h6">
            <b>Room{" " + inspectionProps.room_name} </b>
          </Typography>
          <Typography variant="h6">
            Floor {inspectionProps.floor_number} in{" "}
            {inspectionProps.building_name} Building
          </Typography>
          <Typography>
            Cleaned by{" "}
            {inspectionProps.team_members
              .map((member) => member.first_name + " " + member.last_name)
              .join(", ")}
          </Typography>
        </CardContent>

        <CardActions sx={{ ml: 0 }}>
          <Link href={{ pathname: "inspectionMaker" }}>
            <Button endIcon={<ArrowForwardIcon />} onClick={handleClicked}>
              Inspect
            </Button>
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
};
export default UncompletedCard;
