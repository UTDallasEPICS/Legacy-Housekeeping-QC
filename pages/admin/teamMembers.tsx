import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { MemberProfile, Navbar, Scroll } from "../../src/components";
import { MembersProperties } from "../../interfaces/membersObject";

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
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />

      <Box sx={{ p: 2, width: 1, bgcolor: "#FAFAFA" }}>
        <Container>
          <Typography variant="h5">
            <b>Team Members</b>
          </Typography>
        </Container>
      </Box>

      <Divider />

      <Container sx={{ display: "flex", flex: 1 }}>
        <Box sx={{ pt: 2, pb: 2, justifyContent: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Link href="/admin/addMember">
              <Button
                variant="text"
                sx={{
                  color: "secondary.main",
                }}
              >
                <Add />
              </Button>
            </Link>
          </Box>

          <Scroll members={members} />
        </Box>

        <Divider orientation="vertical" />

        <Box
          sx={{
            display: "flex",
            py: 4,
            pl: 4,
            flex: 1,
            justifyContent: "center",
          }}
        >
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
            <Typography variant="h5">Select a Team Member.</Typography>
          ) : (
            <Typography variant="h5">There are no Team Members.</Typography>
          )}
        </Box>
      </Container>
    </Box>
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
  //console.log(data);
  return {
    props: {
      members: data,
    },
  };
}
