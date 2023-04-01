import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Scroll, MemberProfile } from "../../src/components";
import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  selectFirstName,
  selectLastName,
  selectEmail,
  selectCountryCode,
  selectStateCode,
  selectPhoneNumber,
  selectAddressLine,
  selectCity,
  selectState,
  selectZipcode,
} from "../../slices/memberProfileSlice";
import Link from "next/link";
import { MembersProperties } from "../../interfaces/membersObject";

const teamMembers = ({ members }: MembersProperties) => {
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

  return (
    <>
      <Link href="/admin/addMember">
        <Button
          variant="outlined"
          sx={{
            marginLeft: { sm: "2rem", lg: "7rem" },
            marginTop: "2rem",
            fontSize: { sm: "0.9rem", lg: "1.5rem" },
          }}
        >
          Add Team Member
        </Button>
      </Link>
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
          />
        ) : members.length > 0 ? (
          <Typography
            variant="h6"
            component="h4"
            sx={{
              marginLeft: { sm: "10rem", lg: "20rem" },
              marginTop: { sm: "5rem", lg: "10rem" },
            }}
          >
            Select a team member
          </Typography>
        ) : (
          <Typography
            variant="h6"
            component="h4"
            sx={{
              marginLeft: { sm: "5rem", lg: "10rem" },
              marginTop: { sm: "5rem", lg: "10rem" },
            }}
          >
            Oops! Looks like you need to add Team Members.
          </Typography>
        )}
      </Stack>
    </>
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
  console.log(data);
  return {
    props: {
      members: data,
    },
  };
}
