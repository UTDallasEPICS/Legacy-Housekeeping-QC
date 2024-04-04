import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Link from "next/link";
import { MemberProfileProps } from "../../../../interfaces/memberProfileProps";

const profileInfo = ({
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", flex: 1, mr: 1 }}>
        <Avatar
          sx={{
            bgcolor: "#141c3b",
            width: "7.5rem",
            height: "7.5rem",
            fontSize: "3rem",
            mr: 1,
          }}
        >
          {firstName[0]}
          {lastName[0]}
        </Avatar>
        <Stack direction="column" sx={{ ml: 1 }}>
          <Typography>
            {firstName} {lastName}
          </Typography>
          <Typography>{email}</Typography>
          <Typography>
            {countryCode} ({stateCode}) {phoneNumber.substring(0, 3)}-
            {phoneNumber.substring(3)}
          </Typography>
          <Typography>{addressLine}</Typography>
          <Typography>
            {city}, {state} {zipcode}
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ ml: 1 }}>
        <Link href="/admin/editMember">
          <Button sx={{ color: "secondary.main" }}>
            <Edit />
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default profileInfo;
