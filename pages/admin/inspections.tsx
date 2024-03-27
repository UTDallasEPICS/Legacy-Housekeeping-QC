import { Container } from "@mui/material";
import { InspectionGrid, Navbar } from "../../src/components";
import InspectionPlanner from "../../src/components/inspections/Planner/inspectionPlanner";
import { useDispatch } from "react-redux";
import { setInspectionsFetchData } from "../../slices/inspectionsFetchSlice";
import { splitInspectionWithStatus } from "../../functions/splitInspectionWithStatus";

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
        <Container
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "center",
            padding: "2",
            gap: "2",
            height: "100%",
          }}
          maxWidth={false}
        >
          <InspectionGrid />
          <InspectionPlanner members={members} buildings={buildings} />
        </Container>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const inspectionRes = await fetch(
    "http://localhost:3000/api/roomReport/report",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
