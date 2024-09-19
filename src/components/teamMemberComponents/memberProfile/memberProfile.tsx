import { ProfileInfo } from "../..";
import { TeamMemberProfile } from "../../../../ts/interfaces/teamMember.interfaces";

interface MemberProfileProps {
  memberData: TeamMemberProfile;
}

const MemberProfile = ({ memberData }: MemberProfileProps) => {
  const {
    first_name,
    last_name,
    email,
    country_code,
    state_code,
    phone_number,
  } = memberData;

  return (
    <ProfileInfo
      first_name={first_name}
      last_name={last_name}
      email={email}
      country_code={country_code}
      state_code={state_code}
      phone_number={phone_number}
    />
  );
};

export default MemberProfile;