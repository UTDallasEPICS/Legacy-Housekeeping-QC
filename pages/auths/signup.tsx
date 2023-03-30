import { Button } from "@mui/material";
import Link from "next/link";
import { SignUp } from "../../src/components";

const signup = () => {
  return (
    <>
      <Link href="/">
        <Button
          variant="outlined"
          sx={{ marginLeft: "4rem", marginTop: "3rem" }}
        >
          back
        </Button>
      </Link>
      <SignUp />
    </>
  );
};

export default signup;
