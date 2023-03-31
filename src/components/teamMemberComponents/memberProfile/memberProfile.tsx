import { ProfileInfo } from "../..";
import { MemberProfileProps } from "../../../../interfaces/memberProfileProps";

const memberProfile = ({
  firstName,
  lastName,
  email,
  countryCode,
  stateCode,
  phoneNumber,
  addressLine,
  city,
  state,
  zipcode,
}: MemberProfileProps) => {
  return (
    <ProfileInfo
      firstName={firstName}
      lastName={lastName}
      email={email}
      countryCode={countryCode}
      stateCode={stateCode}
      phoneNumber={phoneNumber}
      addressLine={addressLine}
      city={city}
      state={state}
      zipcode={zipcode}
    />
  );
};

export default memberProfile;
