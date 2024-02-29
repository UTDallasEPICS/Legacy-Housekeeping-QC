import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Link from "next/link";
import { TeamMemberProfile } from "../../../../ts/types/teamMember.interfaces";

const profileInfo = ({
  first_name,
  last_name,
  email,
  country_code,
  state_code,
  phone_number,
}: TeamMemberProfile) => {
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
          {first_name[0]}
          {last_name[0]}
        </Avatar>
        <Stack direction="column" sx={{ ml: 1 }}>
          <Typography>
            {first_name} {last_name}
          </Typography>
          <Typography>{email}</Typography>
          <Typography>
            {country_code} ({state_code}) {phone_number.substring(0, 3)}-
            {phone_number.substring(3)}
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
