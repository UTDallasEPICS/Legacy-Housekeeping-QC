import { ProfileInfo } from "../..";

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
  memberId,
}) => {
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
      memberId={memberId}
    />
  );
};

export default memberProfile;
