import { Button } from "@mui/material";
import Link from "next/link";
import { FormAddMember } from "../../src/components";

const addMember = () => {
  return (
    <div>
      <Link href="/admin/teamMembers">
        <Button
          variant="outlined"
          sx={{
            marginLeft: "4rem",
            marginTop: "2rem",
          }}
        >
          back
        </Button>
      </Link>
      <FormAddMember />
    </div>
  );
};

export default addMember;
