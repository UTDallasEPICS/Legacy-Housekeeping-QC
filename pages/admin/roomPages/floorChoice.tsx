import FloorCards from "../../../src/components/roomScreenDashboard/componentsForFloorSelection/floorCards";
import Navbar from "../../../src/components/adminDashboard/navbar/navbar";
import { theme } from "../../../src/theme";
import Banner from "../../../src/components/adminDashboard/Banner/Banner";

const pageToGoBack = "buildingChoice";

const floorChoice = () => {
  return (
    <div style={{ background: theme.palette.background.default, height: "100vh" }}>
      {/* Heading */}
      <div>
        <Navbar />
        <Banner function="Floor Selection" relativePath={pageToGoBack} />
      </div>

      {/* Displays the buildings for the user to choose */}
      <div style={{ paddingTop: '24px' }}>
        <FloorCards />
      </div>
    </div>
  );
};

export default floorChoice;
