import { ProfileInfo } from "../..";
import { TeamMemberProfile } from "../../../../ts/types/teamMember.interfaces";

const memberProfile = ({
  first_name,
  last_name,
  email,
  country_code,
  state_code,
  phone_number,
}: TeamMemberProfile) => {
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

export default memberProfile;
