import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export const memberInfo = ({ firstName, lastName }) => {
  const displayInfo = () => {
    // Pass in component with necessary props
    console.log("CLICKED");
  };

  return (
    <Grid container item spacing={1}>
      <Paper
        onClick={() => displayInfo()}
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
