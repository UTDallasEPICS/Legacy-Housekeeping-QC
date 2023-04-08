import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardActionArea,
  CardActions,
  Box,
  Button,
  Link,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch } from "react-redux";
import { setInspectionData } from "../../../../slices/inspectionSlice";

const useStyles = makeStyles()(() => {
  return {
    btn: {
      "&:hover": {
        backgroundColor: "lightgrey",
      },
    },
  };
});

const reportComponent = ({
  buildingId,
  roomId,
  teamMemberName,
  timeCleaned,
  cleaningType,
}) => {
  const { classes } = useStyles();

  const dispatch = useDispatch();
  const handle = () => {
    dispatch(
      setInspectionData({
        roomId,
        buildingId,
        teamMemberName,
        timeCleaned,
      })
    );
  };

  return (
    <Grid item>
      <Card variant="outlined" sx={{ width: 1 }}>
        <Box sx={{ display: "inline-flex", width: 1, alignItems: "center" }}>
          <CardActionArea>
            <CardContent sx={{ width: 1, mr: 1 }}>
              <Typography variant="h6">
                <b>{roomId} </b>in {buildingId}
              </Typography>
              <Typography>{cleaningType} Cleaning</Typography>
              <Typography>
                Cleaned by {teamMemberName} at {timeCleaned}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ ml: 1 }}>
            <Link href="../../report">
              <Button endIcon={<ArrowForwardIcon />} onClick={handle}>
                Inspect
              </Button>
            </Link>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};

export default reportComponent;
