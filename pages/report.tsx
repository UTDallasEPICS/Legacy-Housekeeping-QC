import { Typography, Checkbox, Box, Button } from "@mui/material";
import { NavBar } from "../src/components";
import { InspectionCheckBox } from "../src/components";
import {
  selectBuildingId,
  selectRoomId,
  selectTeamMember,
  selectTime,
} from "../slices/inspectionSlice";
import { useSelector } from "react-redux";

const report = () => {
  const roomId = useSelector(selectRoomId);
  const buildingId = useSelector(selectBuildingId);
  const time = useSelector(selectTime);
  const member = useSelector(selectTeamMember);
  const comment = "Chipped mirror";

  return (
    <>
      <NavBar></NavBar>
      <Box
        sx={{ pt: 3, m: 1 }}
        display={"inline-flex"}
        justifyContent="flex-start"
        alignItems="flex-start"
        flexDirection="column"
      >
        <Typography> {roomId} </Typography>
        <Typography> {buildingId} </Typography>
        <Typography> Time: {time} </Typography>
        <Typography> HK: {member} </Typography>

        <InspectionCheckBox />
      </Box>

      <Box
        display="inline-flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        flexDirection="column"
        sx={{ ml: 200 }}
      >
        <Typography>Comments:</Typography>
        <Typography>{comment}</Typography>

        <Button sx={{ display: "flex", justifyContent: "flex-end" }}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default report;
