import { Alert, Button } from "@mui/material";
import Link from "next/link";
import { SignIn } from "../../src/components";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const login = ({ searchParams }: IProps) => {
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
      {searchParams?.message && (
        <Alert severity="error">{searchParams?.message}</Alert>
      )}
      <SignIn />
    </div>
  );
};

export default login;
