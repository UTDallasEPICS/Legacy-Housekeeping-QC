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
import { CompletedInspectionCardProps } from "../../../../ts/interfaces/roomReport.interfaces";

const CompletedCard = ({
  inspectionProps,
}: {
  inspectionProps: CompletedInspectionCardProps;
}) => {
  return (
    <Card>
      <Box sx={{ display: "inline-flex", width: "fill", alignItems: "center" }}>
        <CardActionArea>
          <CardContent sx={{ width: "180px", mr: 0 }}>
            <Typography variant="h6">
              <b>Room{" " + inspectionProps.room_name} </b>
            </Typography>
            <Typography variant="h6">
              Floor {inspectionProps.floor_number}
              in Building {inspectionProps.building_name}
            </Typography>
            <Typography>
              Cleaned by{" "}
              {inspectionProps.team_members
                .map((member) => {
                  member.first_name + " " + member.last_name;
                })
                .join(", ")}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ ml: 0 }}>
          <Link href={{ pathname: "../../report" }}>
            <Button endIcon={<ArrowForwardIcon />}>Inspect</Button>
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
};
export default CompletedCard;
