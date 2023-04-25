import { SignIn } from "../src/components";
import Head from "next/head";
import { Box } from "@mui/material";
import Navbar from "../src/components/adminDashboard/navbar/navbar";
import Dashboard from "../src/components/adminDashboard/dashboard/dashboard";
const index = () => {
  return (
    <div>
      <SignIn />
    </div>
  );
};

export default index;
