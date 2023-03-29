import { Button } from "@mui/material";
import { SignIn } from "../src/components";
import { useState } from "react";

const home = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <Button variant="outlined" onClick={() => setClicked(true)}>
        Admin Dashboard
      </Button>
      <Button variant="outlined">Leader Dashboard</Button>
      {clicked && <SignIn />}
    </div>
  );
};

export default home;
