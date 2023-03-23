import { EditForm } from "../src/components";
import { useSelector } from "react-redux";
import { selectMemberId } from "../slices/memberProfileSlice";

const editMember = () => {
  const memberId = useSelector(selectMemberId);

  return <EditForm memberId={memberId} />;
};

export default editMember;
