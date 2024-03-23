import { InspectionGrid, Navbar } from "../../src/components";
import InspectionPlanner from "../../src/components/inspections/Planner/inspectionPlanner";

const inspections = ({ inspections, members, buildings }) => {
  console.log(members);
  return (
    <>
      <Navbar />
      <main>
        <InspectionGrid inspections={inspections} />
        <InspectionPlanner members={members} buildings={buildings} />
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
