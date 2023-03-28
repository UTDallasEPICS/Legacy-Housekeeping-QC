import { Grid, Card, Paper, CardContent, ButtonBase } from "@mui/material"
import { makeStyles } from "tss-react/mui";
import theme from "../../../../pages/theme";

const useStyles = makeStyles()(() => {
  return {
    btn: {
      "&:hover": {
        backgroundColor: "lightgrey"
      }
    },
  };
});

const reportComponent = () => {
  const { classes } = useStyles();

  return (
    <Grid 
    item
    >
        <Card>
          <ButtonBase
          className={classes.btn}
          sx={{width: 1}}
          onClick={event => {}}
          >
            <CardContent>
              I am a report
            </CardContent>

          </ButtonBase>
      </Card>
    </Grid>
  )
}

export default reportComponent