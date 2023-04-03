import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
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
    <Stack
      direction="row"
      spacing={2}
      sx={{
        marginTop: "6rem",
        marginLeft: { sm: "7rem", lg: "13rem", xl: "25rem" },
      }}
    >
      <Avatar
        sx={{
          bgcolor: "#141c3b",
          width: { sm: "5rem", lg: "10rem", xl: "15rem" },
          height: { sm: "5rem", lg: "10rem", xl: "15rem" },
          fontSize: { sm: "1rem", lg: "2.5rem", xl: "3rem" },
          marginRight: "3rem",
        }}
      >
        {firstName[0]}
        {lastName[0]}
      </Avatar>
      <Stack direction="column" sx={{ paddingTop: "1rem" }}>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: { sm: "0.9rem", lg: "1.1rem", xl: "1.5rem" } }}
        >
          {firstName} {lastName}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: { sm: "0.9rem", lg: "1.1rem", xl: "1.5rem" } }}
        >
          {email}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: { sm: "0.9rem", lg: "1.1rem", xl: "1.5rem" } }}
        >
          {countryCode} ({stateCode}) {phoneNumber.substring(0, 3)}-
          {phoneNumber.substring(3)}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: { sm: "0.9rem", lg: "1.1rem", xl: "1.5rem" } }}
        >
          {addressLine}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: { sm: "0.9rem", lg: "1.1rem", xl: "1.5rem" } }}
        >
          {city}, {state} {zipcode}
        </Typography>
      </Stack>
      <Stack
        direction="column"
        sx={{
          position: "fixed",
          paddingLeft: { sm: "20rem", lg: "30rem", xl: "45rem" },
        }}
      >
        <Link href={"/admin/editMember"}>
          <Button
            variant="outlined"
            sx={{
              fontSize: { sm: "0.9rem", lg: "1.2rem", xl: "1.5rem" },
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
