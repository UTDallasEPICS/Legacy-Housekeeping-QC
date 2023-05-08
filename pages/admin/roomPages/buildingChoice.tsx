import BuildingSelection from "../../../src/components/roomScreenDashboard/componentsForBuildingSelection/buidlingSelection";
import BuildingCards from "../../../src/components/roomScreenDashboard/componentsForBuildingSelection/buildingCards";
import { BackButton } from "../../../src/components";
import { Box } from "@mui/material";
import Navbar from "../../../src/components/adminDashboard/navbar/navbar";
const buildingChoice = () => {
  return (
    <>
      {/*Heading*/}
      <div>
        <Navbar />

        <BuildingSelection />
      </div>

      {/*Displays the buildings for the user to choose*/}
      <Box align="center">
        <BuildingCards />
      </Box>
    </>
  );
};

export default buildingChoice;
