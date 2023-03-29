import { Button } from "@mui/material";
import Link from "next/link";

const index = () => {
  return (
    <div>
      <Link href="/admin/dashboard">
        <Button variant="outlined">Admin Dashboard</Button>
      </Link>
      <Button variant="outlined">Leader Dashboard</Button>
    </div>
  );
};

export default index;
