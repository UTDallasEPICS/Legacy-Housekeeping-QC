import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  Grid,
  InputBase,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  MemberProfile,
  Navbar,
  PageHeading,
  Scroll,
} from "../../src/components";
import {
  selectFirstName,
  selectLastName,
  selectEmail,
  selectCountryCode,
  selectStateCode,
  selectPhoneNumber,
} from "../../slices/memberProfileSlice";
import { TeamMemberProperties } from "../../ts/interfaces/teamMember.interfaces";

const teamMembers = ({ members }: TeamMemberProperties) => {
  // Use Redux selectors to get member profile data
  const first_name = useSelector(selectFirstName);
  const last_name = useSelector(selectLastName);
  const email = useSelector(selectEmail);
  const country_code = useSelector(selectCountryCode);
  const state_code = useSelector(selectStateCode);
  const phone_number = useSelector(selectPhoneNumber);
  const [searchInput, setSearchInput] = useState("");

  // Handler for search input changes
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  // Filter members based on search input
  const filteredMembers = members.filter(
    (member) =>
      member.first_name.toLowerCase().includes(searchInput) ||
      member.last_name.toLowerCase().includes(searchInput)
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <PageHeading text="Team Members" />
      <Divider />

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ pt: 2, pb: 2, justifyContent: "center" }}>
              <Box sx={{ display: "flex", justifyContent: "left" }}>
                <Link href="/admin/addMember">
                  <Button variant="text" sx={{ color: "secondary.main" }}>
                    <Add />
                  </Button>
                </Link>
              </Box>

              <Box sx={{ marginBottom: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    mb: 2,
                    ml: 1,
                  }}
                >
                  <Search sx={{ color: "secondary.main", ml: 2 }} />
                  <InputBase
                    placeholder="Search Team Members"
                    inputProps={{ "aria-label": "search" }}
                    value={searchInput}
                    onChange={handleSearchChange}
                    sx={{ ml: 1, flex: 1 }}
                  />
                </Box>
              </Box>

              <Scroll members={filteredMembers} />
            </Box>
          </Grid>

          {/* Grid for the MemberProfile component */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{ py: 4, pl: 4, display: "flex", justifyContent: "center" }}
            >
              {first_name.length > 0 ? (
                <MemberProfile
                  first_name={first_name}
                  last_name={last_name}
                  email={email}
                  country_code={country_code}
                  state_code={state_code}
                  phone_number={phone_number}
                />
              ) : members.length > 0 ? (
                <Typography variant="h5">Select a Team Member.</Typography>
              ) : (
                <Typography variant="h5">There are no Team Members.</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default teamMembers;

export async function getServerSideProps() {
  const res = await fetch(
    (process.env.NEXTAUTH_URL || "http://localhost:3000") +
      "/api/member/members"
  );
  const data = await res.json();
  return {
    props: {
      members: data,
    },
  };
}
