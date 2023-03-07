import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { display, flexbox } from "@mui/system";

const dashboard = () => {
  return (
    <Box component={"div"} sx={{ display: "flexbox" }}>
      <h1>Hello, User!</h1>
      <Container>
        <Card>
          <div>performance box</div>
        </Card>

        <Card>
          <div>Todays inspections box</div>
        </Card>
      </Container>
    </Box>
  );
};

export default dashboard;
