import { Card } from "@mui/material";
import { InspectionGrid, NavBar } from "../../src/components";

const inspections = () => {
  return (
    <>
      <NavBar></NavBar>
      <main>
        <InspectionGrid></InspectionGrid>
      </main>
    </>
  );
};

export default inspections;
