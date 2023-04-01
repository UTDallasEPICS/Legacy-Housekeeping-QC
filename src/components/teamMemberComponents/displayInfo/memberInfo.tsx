import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { setMemberProfile } from "../../../../slices/memberProfileSlice";
import { MemberInfoProps } from "../../../../interfaces/memberProps";

export const memberInfo = ({
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
}: MemberInfoProps) => {
  const dispatch = useDispatch();

  const handle = () => {
    dispatch(
      setMemberProfile({
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
      })
    );
  };

  return (
    <Grid container item spacing={1}>
      <Paper
        onClick={() => handle()}
        elevation={5}
        sx={{
          height: { sm: "5rem", md: "5rem", lg: "10rem" },
          width: { sm: "10rem", md: "10rem", lg: "20rem" },
          border: 1,
          "&:hover": {
            border: 3,
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            paddingTop: { sm: "1.5rem", lg: "3.5rem" },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { sm: "1rem", lg: "1.5rem" },
            }}
            component="h4"
          >
            {firstName} {lastName}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default memberInfo;
