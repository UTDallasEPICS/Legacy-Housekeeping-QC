import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { Divider, ToggleButtonGroup, ToggleButton } from "@mui/material";

import DashboardCardHeading from "../../dashboardCardComponents/DashboardCardHeading";
import DashboardCardProgressListItemButton from "../../dashboardCardComponents/DashboardCardProgressListItemButton";
import DashboardCardButton from "../../dashboardCardComponents/DashboardCardButton";

const dashboard = () => {
  return (
    <Box component={"div"}>
      <Container sx={{ textAlign: "center" }}>
        <Box sx={{ p: 4 }}>
          <Typography variant="h3">Hello,<b> User</b></Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Card sx={{ width: 0.75, m: 2 }}>
            <DashboardCardHeading title="Performance Insights"></DashboardCardHeading>

            <Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="h5">Average Cleaning Score</Typography>
                <Typography variant="h2">87.6</Typography>
              </Box>

              <Divider variant="middle" />

              <Box sx={{ pt: 2, pb: 1 }}>
                <Typography variant="h5">On the Rise</Typography>
                <List>
                  <DashboardCardProgressListItemButton
                    teamMemberName="Team Member 1"
                    teamMemberId="00556"
                    scoreChange="+6.8"
                    type="onTheRise"
                  ></DashboardCardProgressListItemButton>
                </List>
              </Box>

              <Box sx={{ pt: 1, pb: 2 }}>
                <Typography variant="h5">Declining</Typography>
                <List>
                  <DashboardCardProgressListItemButton
                    teamMemberName="Team Member 2"
                    teamMemberId="00557"
                    scoreChange="-3.5"
                    type="declining"
                  ></DashboardCardProgressListItemButton>
                </List>
              </Box>
            </Box>

            <Divider variant="middle" />

            <DashboardCardButton text="More performance data"></DashboardCardButton>
          </Card>

          <Card sx={{ width: 0.75, m: 2 }}>
            <DashboardCardHeading title="Today's Inspections"></DashboardCardHeading>

            <Box sx={{ p: 2 }}>
              <ToggleButtonGroup>
                <ToggleButton value="completed">Completed</ToggleButton>
                <ToggleButton value="remaining">Remaining</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Divider variant="middle" />

            <DashboardCardButton text="All inspections"></DashboardCardButton>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default dashboard;
