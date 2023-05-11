import { InspectionGrid } from "../src/components";
import { getSession } from "next-auth/react";

const inspections = ({ reports }) => {
  return (
    <>
      <main>
        <InspectionGrid reports={reports} />
      </main>
    </>
  );
};

export default inspections;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "api/auth/signin",
        permanent: false,
      },
    };
  }

  const res = await fetch("http://localhost:3000/api/roomReport/report");
  const data = await res.json();
  //console.log(data.room);
  return {
    props: {
      reports: data,
    },
  };
}
