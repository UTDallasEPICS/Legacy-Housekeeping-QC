import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import Link from "next/link";

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
  memberId,
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        marginTop: "6rem",
        marginLeft: "10rem",
      }}
    >
      <Avatar
        sx={{
          bgcolor: "#141c3b",
          width: 150,
          height: 150,
          fontSize: 50,
          marginRight: "3rem",
        }}
      >
        {firstName[0]}
        {lastName[0]}
      </Avatar>
      <Stack direction="column" sx={{ paddingTop: "1rem" }}>
        <Typography variant="subtitle2" fontSize="1rem">
          {firstName} {lastName}
        </Typography>
        <Typography variant="subtitle2" fontSize="1rem">
          {email}
        </Typography>
        <Typography variant="subtitle2" fontSize="1rem">
          {countryCode} ({stateCode}) {phoneNumber.substring(0, 3)}-
          {phoneNumber.substring(3)}
        </Typography>
        <Typography variant="subtitle2" fontSize="1rem">
          {addressLine}
        </Typography>
        <Typography variant="subtitle2" fontSize="1rem">
          {city}, {state} {zipcode}
        </Typography>
      </Stack>
      <Stack
        direction="column"
        sx={{
          position: "fixed",
          paddingLeft: "35rem",
        }}
      >
        <Link href={`/editMember/${memberId}`}>
          <Button
            variant="outlined"
            sx={{
              height: "3rem",
            }}
          >
            Edit Team Member
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default profileInfo;
