import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export const memberInfo = ({
  firstName,
  lastName,
  handleClick,
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
    <Grid container item spacing={1}>
      <Paper
        onClick={() =>
          handleClick(
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
            memberId
          )
        }
        elevation={5}
        sx={{
          height: "10rem",
          width: "20rem",
          border: 1,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            paddingTop: "3.5rem",
          }}
        >
          <Typography variant="h6" component="h4">
            {firstName} {lastName}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default memberInfo;
