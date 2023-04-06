import BuildingSelection from "../../../src/components/roomScreenDashboard/componentsForBuildingSelection/buidlingSelection";
import BuildingCards from "../../../src/components/roomScreenDashboard/componentsForBuildingSelection/buildingCards";
import BackButton from "../../../src/components/backButton";
import { Box } from "@mui/material";
const buildingChoice = () => {
  return (
    <>
      {/*Heading*/}
      <div>
        <BackButton pageToGoBack={"/"} />
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
