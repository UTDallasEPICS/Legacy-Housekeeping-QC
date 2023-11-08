import FloorSelection from "../../../src/components/roomScreenDashboard/componentsForFloorSelection/floorSelection";
import FloorCards from "../../../src/components/roomScreenDashboard/componentsForFloorSelection/floorCards";
import { BackButton } from "../../../src/components";
import { Box } from "@mui/material";
import Navbar from "../../../src/components/adminDashboard/navbar/navbar";
const floorChoice = () => {
  return (
    <>
      {/*Heading*/}
      <div>
        <Navbar />
        <FloorSelection />
        <BackButton pageToGoBack={"buildingChoice"} />
      </div>

      {/*Displays the buildings for the user to choose*/}
      <div style={{marginTop:10}}>
        <FloorCards />
      </div>
        
    </>
  );
};

export default floorChoice;
