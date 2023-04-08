import { Box, Card, CardActionArea, ListItem, Typography } from "@mui/material";

interface CIListItemCardProps {
  roomId: string;
  memberName: string;
  timeCleaned: string;
  score: number;
  type: "pass" | "fail";
}

const completedInspectionListItemCard = (props: CIListItemCardProps) => {
  let scoreChangeColor;

  if (props.type === "pass") {
    scoreChangeColor = "success.main";
  } else if (props.type === "fail") {
    scoreChangeColor = "grey.500";
  }

  return (
    <ListItem>
      <Card variant="outlined" sx={{ width: 1 }}>
        <CardActionArea sx={{ p: 2 }}>
          <Box
            sx={{
              width: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: 1, mr: 1 }}>
              <Typography variant="h6">
                <b>{props.roomId}</b>
              </Typography>
              <Typography>
                Cleaned by {props.memberName} at {props.timeCleaned}
              </Typography>
            </Box>
            <Box sx={{ ml: 1 }}>
              <Typography
                sx={{
                  color: scoreChangeColor,
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                {props.score + "%"}
              </Typography>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </ListItem>
  );
};

export default completedInspectionListItemCard;
