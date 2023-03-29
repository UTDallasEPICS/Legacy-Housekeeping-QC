import { EditForm } from "../../src/components";
import { useSelector } from "react-redux";
import { selectMemberId } from "../../slices/memberProfileSlice";
import Link from "next/link";
import Button from "@mui/material/Button";

const editMember = () => {
  const memberId = useSelector(selectMemberId);

  return (
    <>
      <Link href="/teamMembers">
        <Button
          variant="outlined"
          sx={{
            marginLeft: "7rem",
            marginTop: "2rem",
          }}
        >
          back
        </Button>
      </Link>
      <EditForm memberId={memberId} />
    </>
  );
};

export default editMember;
