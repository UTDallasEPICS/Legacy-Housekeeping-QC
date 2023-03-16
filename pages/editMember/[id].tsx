import { EditForm } from "../../src/components";
import { useRouter } from "next/router";

const editMember = () => {
  const { query } = useRouter();

  return <EditForm memberId={query.id} />;
};

export default editMember;
