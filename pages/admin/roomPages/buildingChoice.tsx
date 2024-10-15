import BuildingCardsNew from "../../../src/components/roomScreenDashboard/componentsForBuildingSelection/buildingCardsNew";
import Navbar from "../../../src/components/adminDashboard/navbar/navbar";
import {theme} from "../../../src/theme";
import MainBanner from "../../../src/components/adminDashboard/Banner/MainBanner";

const buildingChoice = () => {
  return (
    <div>
      {/* Heading */}
      <div>
        <Navbar />
        <MainBanner text="Building Selection"/>
      </div>

      {/* Displays the buildings for the user to choose */}
      <div style={{marginTop: 24, background: theme.palette.background.default, height: "100vh"}}>
        <BuildingCardsNew />
      </div>
        
    </div>
  );
};

export default buildingChoice;
