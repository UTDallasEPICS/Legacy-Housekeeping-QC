import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

const userDashboard = () => {
  return (
    <div>
      userDashboard
      <Button variant="outlined" onClick={() => signOut()}>
        SignOut
      </Button>
    </div>
  );
};

export default userDashboard;
