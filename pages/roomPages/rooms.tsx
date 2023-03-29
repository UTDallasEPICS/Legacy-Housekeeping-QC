import BuildingSelection from "../../src/components/roomScreenDashboard/buidlingSelection";
import RoomCards from "../../src/components/roomScreenDashboard/roomCards";
import BackButton from "../../src/components/backButton";
import { Box } from "@mui/material";
const rooms = () => {
  return (
    <>
      {/*Heading*/}
      <div>
        <BackButton pageToGoBack={"/"} />
        <BuildingSelection />
      </div>

      {/*Displays the buildings for the user to choose*/}
      <Box align="center">
        <RoomCards />
      </Box>
    </>
  );
};

export default rooms;
