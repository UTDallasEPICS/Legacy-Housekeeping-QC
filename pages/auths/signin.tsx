import { Alert } from "@mui/material";
import { SignInCardInVPSize } from "../../src/components";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const signin = ({ searchParams }: IProps) => {
  return (
    <div>
      {searchParams?.message && (
        <Alert severity="error">{searchParams?.message}</Alert>
      )}

      <SignInCardInVPSize />
    </div>
  );
};

export default signin;
