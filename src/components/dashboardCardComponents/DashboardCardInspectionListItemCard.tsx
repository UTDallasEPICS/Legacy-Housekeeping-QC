import { Box, Card, CardActionArea, ListItem, Typography } from "@mui/material";

const DashboardCardInspectionListItemCard = ({ buildingId, roomId, teamMemberName, leaderName, timeCleaned, score, type }) => {
    let scoreChangeColor;

    if (type === "pass") {
        scoreChangeColor = "success.main";
    }
    else if (type === "fail") {
        scoreChangeColor = "grey.500";
    }

    return (
        <ListItem>
            <Card variant="outlined" sx={{ width: 1 }}>
                <CardActionArea sx={{ p: 2 }}>
                    <Box sx={{ display: "inline-flex", width: 1, alignItems: "center" }}>
                        <Box sx={{ width: 1, mr: 1 }}>
                            <Typography variant="h6"><b>{roomId} </b>in {buildingId}</Typography>
                            <Typography>Cleaned by {teamMemberName} at {timeCleaned}</Typography>
                            <Typography>Inspected by {leaderName}</Typography>
                        </Box>
                        <Box sx={{ ml: 1 }}>
                            <Typography sx={{ color: scoreChangeColor, fontWeight: "bold", textAlign: "right" }}>{score + "%"}</Typography>
                        </Box>
                    </Box>
                </CardActionArea>
            </Card>
        </ListItem>
    );
};

export default DashboardCardInspectionListItemCard;