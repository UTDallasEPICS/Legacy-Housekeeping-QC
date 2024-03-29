import { CssBaseline } from "@mui/material";
import InspectionMaker from "../../src/components/inspections/Reports/inspectionMaker";

const makeInspection = () => {
  return (
    <>
      <main>
        <CssBaseline />
        <InspectionMaker />
      </main>
    </>
  );
};

export default makeInspection;
