import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Scroll, MemberProfile } from "../src/components";
import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectMemberId } from "../slices/memberProfileSlice";
import {
  selectPhoneNumber,
  selectAddressLine,
  selectCity,
  selectState,
  selectZipcode,
} from "../slices/memberProfileSlice";
import {
  selectFirstName,
  selectLastName,
  selectEmail,
  selectCountryCode,
  selectStateCode,
} from "../slices/memberProfileSlice";

const teamMembers = ({ members }) => {
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const email = useSelector(selectEmail);
  const countryCode = useSelector(selectCountryCode);
  const stateCode = useSelector(selectStateCode);
  const phoneNumber = useSelector(selectPhoneNumber);
  const addressLine = useSelector(selectAddressLine);
  const city = useSelector(selectCity);
  const state = useSelector(selectState);
  const zipcode = useSelector(selectZipcode);
  const memberId = useSelector(selectMemberId);

  return (
    <Stack direction="row">
      <Scroll members={members} />
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

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "api/auth/signin",
        permanent: false,
      },
    };
  }

  const res = await fetch("http://localhost:3000/api/member/members");
  const data = await res.json();
  //console.log(await res.text());

  return {
    props: {
      members: data,
    },
  };
}
