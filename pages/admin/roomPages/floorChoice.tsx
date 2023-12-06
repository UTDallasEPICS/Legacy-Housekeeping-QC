import FloorSelection from "../../../src/components/roomScreenDashboard/componentsForFloorSelection/floorSelection";
import FloorCards from "../../../src/components/roomScreenDashboard/componentsForFloorSelection/floorCards";
import { BackButton } from "../../../src/components";
import { Box } from "@mui/material";
import Navbar from "../../../src/components/adminDashboard/navbar/navbar";
const floorChoice = () => {
  return (
    <div style={{background: 'linear-gradient(#141c3b,#ffffff)',height:"100vh"}}>
      {/*Heading*/}
      <div>
        <Navbar />
        <FloorSelection />
        
      </div>

      {/*Displays the buildings for the user to choose*/}
      <div>
        <BackButton pageToGoBack={"buildingChoice"} />
        <FloorCards />
      </div>
        
    </div>
  );
};

export default floorChoice;
