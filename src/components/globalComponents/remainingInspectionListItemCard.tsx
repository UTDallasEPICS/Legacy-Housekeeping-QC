import {
  Box,
  Button,
  Card,
  CardActionArea,
  ListItem,
  Typography,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Link from "next/link";

interface RIListItemCardProps {
  roomId: string;
  memberName: string;
  timeCleaned: string;
  cleaningType: string;
}

const remainingInspectionListItemCard = (props: RIListItemCardProps) => {
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
              <Typography>{props.cleaningType} Cleaning</Typography>
              <Typography>
                Cleaned by {props.memberName} at {props.timeCleaned}
              </Typography>
            </Box>
            <Box sx={{ ml: 1 }}>
            {/* <Link
                  href={{
                    pathname: "../../report",
                    //query: props,
                  }}
                > */}
                <Button
                  disableElevation
                  disableFocusRipple
                  disableRipple
                  variant="text"
                  endIcon={<ArrowForward />}
                  
                  sx={{ color: "primary.main", href: "../../report" }}
                  
                >
                  Inspect
                </Button>
                {/* </Link> */}

            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </ListItem>
  );
};

export default remainingInspectionListItemCard;
