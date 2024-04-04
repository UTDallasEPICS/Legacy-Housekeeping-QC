import { ProfileInfo } from "../..";
import { MemberProfileProps } from "../../../../interfaces/memberProfileProps";

const memberProfile = ({
  firstName,
  lastName,
  email,

  phoneNumber
}: MemberProfileProps) => {
  return (
    <ProfileInfo
      firstName={firstName}
      lastName={lastName}
      email={email}
      phoneNumber={phoneNumber}
    />
  );
};

export default memberProfile;
