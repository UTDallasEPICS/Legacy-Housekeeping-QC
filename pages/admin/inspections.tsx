import { Box, Container } from "@mui/material";
import { InspectionGrid, Navbar } from "../../src/components";
import InspectionPlanner from "../../src/components/inspections/Planner/inspectionPlanner";
import { useDispatch } from "react-redux";
import { setInspectionsFetchData } from "../../slices/inspectionsFetchSlice";
import { splitInspectionWithStatus } from "../../functions/splitInspectionWithStatus";
import InspectionDateSelector from "../../src/components/inspections/Date/InspectionDateSelector";

const inspections = ({ inspections, members, buildings }) => {
  const { notInspected, inspected } = splitInspectionWithStatus(inspections);

  const dispatch = useDispatch();
  dispatch(
    setInspectionsFetchData({
      inspected: inspected,
      notInspected: notInspected,
    })
  );

  return (
    <>
      <Navbar />
      <main>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          <InspectionGrid />
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "row",
                md: "column",
              },
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
            }}
          >
            <InspectionPlanner members={members} buildings={buildings} />
            <InspectionDateSelector />
          </Box>
        </Box>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const inspectionRes = await fetch(
    "http://localhost:3000/api/roomReport/report",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: new Date().toISOString(),
      }),
    }
  );
  const inspectionData = await inspectionRes.json();

  const memberRes = await fetch("http://localhost:3000/api/member/members", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const memberData = await memberRes.json();

  const buildingsRes = await fetch(
    "http://localhost:3000/api/building/buildingsWithRoom",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const buildingsData = await buildingsRes.json();

  return {
    props: {
      inspections: inspectionData,
      members: memberData,
      buildings: buildingsData,
    },
  };
}

export default inspections;
