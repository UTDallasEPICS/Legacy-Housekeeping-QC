import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardActionArea,
  CardActions,
  Box,
  Button,
} from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useHref } from "react-router-dom";

const ReportComponent = ({ report }) => {
  let reportProp = {
    team_member_id: report.team_member_id,
    room_id: report.room_id,
    date: report.date,
    cleaned: report.cleaned,
    comments: report.comments,
    first_name: report.team_member.first_name,
    last_name: report.team_member.last_name,
    email: report.team_member.email,
    country_code: report.team_member.country_code,
    state_code: report.team_member.state_code,
    phone_number: report.team_member.phone_number,
    address_line: report.team_member.address_line,
    zipcode: report.team_member.zipcode,
    city: report.team_member.city,
    state: report.team_member.state,
    total_points: report.team_member.total_points,
    room_number: report?.room?.room_number,
    building_number: report?.room?.building_number,
    is_clean: report?.room?.is_clean,
    //is_locked: report.room.is_locked,
    is_active: report?.room?.is_active,
    type_of_room: report?.room?.type_of_room,
  };

  let scoreChangeColor = "grey.500";
  if (reportProp.total_points >= "pass") {
    scoreChangeColor = "success.main";
  } else if (reportProp.total_points <= "fail") {
    scoreChangeColor = "grey.500";
  }

  const Condition = ({
    isClean,
    remainingReport,
    completeReport,
  }: {
    isClean: boolean;
    remainingReport: any;
    completeReport: any;
  }) => {
    if (isClean) return <>{completeReport}</>;
    return <>{remainingReport}</>;
  };

  return (
    <Condition
      isClean={reportProp.cleaned}
      remainingReport={
        <Grid item sx={{width: "fit-content"}}>
          <Card variant="outlined" sx={{ width: "fit-content" }}>
            <Box
              sx={{ display: "inline-flex", width: "fit-content", alignItems: "center" }}
            >
              <CardActionArea>
                <CardContent sx={{ width: "180px", mr: 0 }}>
                  <Typography variant="h6">
                    <b>Room {reportProp.room_number} </b>
                  </Typography>
                  <Typography variant="h6">
                    Building{" "} {reportProp.building_number}
                  </Typography>
                  {/* <Typography>
                    Cleaned by{" "}
                    {reportProp.first_name + " " + reportProp.last_name} at{" "}
                    {report.date}
                  </Typography> */}
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ ml: 0 }}>
                <Link
                  href={{
                    pathname: "../../report",
                    query: reportProp,
                  }}
                >
                  <Button endIcon={<ArrowForwardIcon />}>Inspect</Button>
                </Link>
              </CardActions>
            </Box>
          </Card>
        </Grid>
      }
      completeReport={
        <Grid item>
          <Link
            style={{
              textDecoration: "none",
            }}
            href={{
              pathname: "../../report",
              query: reportProp,
            }}
          >
            <Card variant="outlined" sx={{ width: "max-content" }}>
              <CardActionArea sx={{ p: 2 }}>
                <Box
                  sx={{
                    width: "max-content",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ flex: 1, mr: 1 }}>
                    <Typography variant="h6">
                      <b>Room {reportProp.room_number}</b>
                    </Typography>
                    {/* <Typography>
                      Cleaned by{" "}
                      {reportProp.first_name + " " + reportProp.last_name} at{" "}
                      {reportProp.date}
                    </Typography> */}
                  </Box>
                  <Box sx={{ ml: 1 }}>
                    <Typography
                      sx={{
                        color: scoreChangeColor,
                        fontWeight: "bold",
                        textAlign: "right",
                      }}
                    >
                      {reportProp.total_points + "test%"}
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      }
    ></Condition>
  );
};

export default ReportComponent;