import { Box, Card, CardActionArea, CardActions, ListItem, Typography, Button, CardContent } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const RemainingInspectionListItemCard = ({ buildingId, roomId, teamMemberName, timeCleaned, cleaningType }) => {
    return (
        <ListItem>
            <Card variant="outlined" sx={{ width: 1 }}>
                <Box sx={{ display: "inline-flex", width: 1, alignItems: "center" }}>
                    <CardActionArea>
                        <CardContent sx={{ width: 1, mr: 1 }}>
                            <Typography variant="h6"><b>{roomId} </b>in {buildingId}</Typography>
                            <Typography>{cleaningType} Cleaning</Typography>
                            <Typography>Cleaned by {teamMemberName} at {timeCleaned}</Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ ml: 1 }}>
                        <Button endIcon={<ArrowForwardIcon />}>Inspect</Button>
                    </CardActions>
                </Box>
            </Card>
        </ListItem>
    );
};

export default RemainingInspectionListItemCard;