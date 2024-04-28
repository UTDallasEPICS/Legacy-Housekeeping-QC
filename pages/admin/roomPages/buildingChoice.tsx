import BuildingSelection from "../../../src/components/roomScreenDashboard/componentsForBuildingSelection/buidlingSelection";
import BuildingCardsNew from "../../../src/components/roomScreenDashboard/componentsForBuildingSelection/buildingCardsNew";
import { BackButton } from "../../../src/components";
import { Box } from "@mui/material";
import Navbar from "../../../src/components/adminDashboard/navbar/navbar";
import theme from "../../../pages/theme";

const buildingChoice = () => {
  return (
    <div>
      {/*Heading*/}

      <div>
        <Navbar />
        
        <BuildingSelection />
      </div>

      {/*Displays the buildings for the user to choose*/}
      <div style={{marginTop: 24, background: theme.palette.background.default, height: "100vh"}}>
        <BuildingCardsNew />
      </div>
        
    </div>
  );
};

export default buildingChoice;
