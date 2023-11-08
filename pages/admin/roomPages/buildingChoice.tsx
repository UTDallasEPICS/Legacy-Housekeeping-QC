import BuildingSelection from "../../../src/components/roomScreenDashboard/componentsForBuildingSelection/buidlingSelection";
import BuildingCardsNew from "../../../src/components/roomScreenDashboard/componentsForBuildingSelection/buildingCardsNew";
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
      <div style={{marginTop:10}}>
        <BuildingCardsNew />
      </div>
        
    </>
  );
};

export default buildingChoice;
