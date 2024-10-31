import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Container, Divider, Typography, Grid, InputBase, Card } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { MemberProfile, Navbar, PageHeading, Scroll } from "../../src/components";
import { selectFirstName, selectLastName, selectEmail, selectCountryCode, selectStateCode, selectPhoneNumber } from "../../slices/memberProfileSlice";
import { TeamMemberProperties } from "../../ts/interfaces/teamMember.interfaces";
import MainBanner from "../../src/components/adminDashboard/Banner/MainBanner";

const teamMembers = ({ members }: TeamMemberProperties) => {
  const router = useRouter();
  const [memberData, setMemberData] = useState(members);
  const first_name = useSelector(selectFirstName);
  const last_name = useSelector(selectLastName);
  const email = useSelector(selectEmail);
  const country_code = useSelector(selectCountryCode);
  const state_code = useSelector(selectStateCode);
  const phone_number = useSelector(selectPhoneNumber);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await fetch(
        (process.env.NEXTAUTH_URL || "http://localhost:3000") + "/api/member/members"
      );
      const data = await res.json();
      setMemberData(data);
    };

    fetchMembers();
    console.log(router.asPath);
  }, [router.asPath]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  const filteredMembers = memberData.filter(
    (member) =>
      member.first_name.toLowerCase().includes(searchInput) ||
      member.last_name.toLowerCase().includes(searchInput)
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <MainBanner text="Team Members" />

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ pt: 2, pb: 2, justifyContent: "center", marginTop: 4 }}>
              <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                mx: 2
              }}>

                <Box sx={{ marginBottom: 2 }}>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      mb: 2,
                    }}
                  >
                    <Search sx={{ color: "secondary.main", ml: 1 }} />
                    <InputBase
                      placeholder="Search Team Members"
                      inputProps={{ "aria-label": "search" }}
                      value={searchInput}
                      onChange={handleSearchChange}
                      sx={{ ml: 1, flex: 1 }}
                    />
                  </Box>
                </Box>

                <Link href="/admin/addMember">
                  <Button variant="text" sx={{ color: "secondary.main" }}>
                    <Add />
                  </Button>
                </Link>

              </Box>

              <Scroll members={filteredMembers} />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ py: 4, pl: 4, display: "flex", justifyContent: "center", marginTop: 4 }}>
              {first_name ? (
                <MemberProfile
                  memberData={{
                    first_name,
                    last_name,
                    email,
                    country_code,
                    state_code,
                    phone_number,
                  }}
                />
              ) : memberData.length > 0 ? (
                <Typography variant="h5">Select a Team Member.</Typography>
              ) : (
                <Typography variant="h5">There are no Team Members.</Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default teamMembers;

export async function getServerSideProps() {
  const res = await fetch(
    (process.env.NEXTAUTH_URL || "http://localhost:3000") + "/api/member/members"
  );
  const data = await res.json();
  return {
    props: {
      members: data,
    },
  };
}