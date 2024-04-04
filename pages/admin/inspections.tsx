import { Card } from "@mui/material";
import { InspectionGrid, Navbar } from "../../src/components";
import { useEffect, useState } from "react";

const inspections = ({ reports }) => {
  console.log(reports);
  return (
    <>
      <Navbar />
      <main>
        <InspectionGrid reports={reports} />
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/roomReport/report", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const data = await res.json();

  return {
    props: {
      reports: data,
    },
  };
}

export default inspections;


/*
import { Card } from "@mui/material";
import { InspectionGrid, Navbar } from "../../src/components";
import { useEffect } from "react";

const inspections = () => {
  
  useEffect(() => {

    const res = fetch("http://localhost:3000/api/roomReport/report", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Report),
  });
  const data = res.json();
  console.log(data.room);
  return {
    props: {
      reports: data,
      
    },
  };
  },[]);
  
  
  return (
    <>
      <Navbar></Navbar>
      <main>
        <InspectionGrid reports={data}></InspectionGrid>
      </main>
    </>
  );
};

export default inspections;
*/
