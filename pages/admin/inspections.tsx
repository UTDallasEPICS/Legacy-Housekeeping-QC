import { Box } from "@mui/material";
import {
  InspectionDateSelector,
  InspectionGrid,
  InspectionPlanner,
  Navbar,
} from "../../src/components";
import { useDispatch } from "react-redux";
import { setInspectionsFetchData } from "../../slices/inspectionsFetchSlice";
import getInspection from "../../functions/getInspection";

const inspections = ({ inspected, notInspected, members, buildings }) => {
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
                xs: "column",
                sm: "row",
                md: "column",
              },
              alignItems: "center",
              gap: 5,
              padding: 2,
              //justifyContent: "space-evenly",
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
  const { inspected, notInspected } = await getInspection();

  const memberRes = await fetch(
    (process.env.NEXTAUTH_URL || "http://localhost:3000") +
    "/api/member/members",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const memberData = await memberRes.json();

  const buildingsRes = await fetch(
    (process.env.NEXTAUTH_URL || "http://localhost:3000") +
    "/api/building/buildingsWithRoom",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const buildingsData = await buildingsRes.json();

  return {
    props: {
      inspected: inspected,
      notInspected: notInspected,
      members: memberData,
      buildings: buildingsData,
    },
  };
}

export default inspections;
