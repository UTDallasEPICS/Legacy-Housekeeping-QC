import { Box, Container, Typography } from "@mui/material";

interface PageHeadingProps {
  text: string;
}

const pageHeading = (props: PageHeadingProps) => {
  return (
    <Box sx={{ p: 2, width: 1, bgcolor: "#FAFAFA" }}>
      <Container>
        <Typography variant="h5">
          <b>{props.text}</b>
        </Typography>
      </Container>
    </Box>
  );
};

export default pageHeading;
