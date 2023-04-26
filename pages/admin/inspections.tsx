import { Card } from "@mui/material";
import { InspectionGrid, Navbar } from "../../src/components";

const inspections = () => {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <InspectionGrid></InspectionGrid>
      </main>
    </>
  );
};

export default inspections;
