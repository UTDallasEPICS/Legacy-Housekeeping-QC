import BuildingSelection from "../../src/components/roomScreenDashboard/componentsForBuildingSelection/buidlingSelection";
import BuildingCards from "../../src/components/roomScreenDashboard/componentsForBuildingSelection/buildingCards";
import BackButton from "../../src/components/backButton";

const buildingChoice = () => {
  return (
    <>
      {/*Heading*/}
      <div>
        <BackButton pageToGoBack={"/"} />
        <BuildingSelection />
      </div>

      {/*Displays the buildings for the user to choose*/}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BuildingCards />
      </div>
    </>
  );
};

export default buildingChoice;
