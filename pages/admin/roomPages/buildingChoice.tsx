import BuildingSelection from "../../../src/components/roomScreenDashboard/componentsForBuildingSelection/buidlingSelection";
import BuildingCardsNew from "../../../src/components/roomScreenDashboard/componentsForBuildingSelection/buildingCardsNew";
import { BackButton } from "../../../src/components";
import { Box } from "@mui/material";
import Navbar from "../../../src/components/adminDashboard/navbar/navbar";
const buildingChoice = () => {
  return (
    <div>
      {/*Heading*/}

      <div>
        <Navbar />
        
        <BuildingSelection />
      </div>

      {/*Displays the buildings for the user to choose*/}
      <div style={{marginTop:10,background: 'linear-gradient(#141c3b,#ffffff)',height:"100vh"}}>
        <BuildingCardsNew />
      </div>
        
    </div>
  );
};

export default buildingChoice;
