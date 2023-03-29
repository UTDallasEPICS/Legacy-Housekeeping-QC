import { Button } from "@mui/material";
import Link from "next/link";
import { SignIn } from "../../src/components";

const login = () => {
  return (
    <div>
      <Link href="/">
        <Button
          variant="outlined"
          sx={{ marginLeft: "4rem", marginTop: "3rem" }}
        >
          back
        </Button>
      </Link>
      <SignIn />
    </div>
  );
};

export default login;
