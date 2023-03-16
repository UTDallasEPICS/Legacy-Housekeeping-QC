import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Scroll, MemberProfile } from "../src/components";
import { useState } from "react";

const teamMembers = ({ members }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [memberId, setMemberId] = useState("");

  const handleClick = (
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
    memberId
  ) => {
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setCountryCode(countryCode);
    setStateCode(stateCode);
    setPhoneNumber(phoneNumber);
    setAddressLine(addressLine);
    setCity(city);
    setState(state);
    setZipcode(zipcode);
    setMemberId(memberId);
  };

  return (
    <Stack direction="row">
      <Scroll members={members} handleClick={handleClick} />
      {firstName.length > 0 ? (
        <MemberProfile
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
      ) : members.length > 0 ? (
        <Typography
          variant="h6"
          component="h4"
          sx={{
            marginLeft: "20rem",
            marginTop: "10rem",
          }}
        >
          Select a team member
        </Typography>
      ) : (
        <Typography
          variant="h6"
          component="h4"
          sx={{
            marginLeft: "10rem",
            marginTop: "10rem",
          }}
        >
          Oops! Looks like you need to add Team Members.
        </Typography>
      )}
    </Stack>
  );
};

export default teamMembers;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/member/members");
  const data = await res.json();

  return {
    props: {
      members: data,
    },
  };
}
