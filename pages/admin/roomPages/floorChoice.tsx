import FloorSelection from "../../../src/components/roomScreenDashboard/componentsForFloorSelection/floorSelection";
import FloorCards from "../../../src/components/roomScreenDashboard/componentsForFloorSelection/floorCards";
import Navbar from "../../../src/components/adminDashboard/navbar/navbar";
import theme from "../../../pages/theme";

const floorChoice = () => {
  return (
    <div style={{background: theme.palette.background.default ,height:"100vh"}}>
      {/*Heading*/}
      <div>
        <Navbar />
        <FloorSelection />
        
      </div>

      {/*Displays the buildings for the user to choose*/}
      <div style={{ paddingTop: '24px' }}>
        <FloorCards />
      </div>
        
    </div>
  );
};

export default floorChoice;
