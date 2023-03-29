import { Button } from "@mui/material";
import Link from "next/link";

const index = () => {
  return (
    <div>
      <Link href="/admin/adminDashboard">
        <Button variant="outlined">Admin Dashboard</Button>
      </Link>
      <Link href="/user/userDashboard">
        <Button variant="outlined">Leader Dashboard</Button>
      </Link>
    </div>
  );
};

export default index;
