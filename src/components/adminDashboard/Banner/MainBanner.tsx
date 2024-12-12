import { AppBar, CssBaseline, Grid, Typography } from "@mui/material";
import React from "react";
import { montserrat } from "../../../theme";

const MainBanner: React.FC<{ text: string }> = ({ text }) => {
    return (
        <>
            <CssBaseline />
            <AppBar
                position="relative"
                sx={{
                    p: 2,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <Grid container justifyContent="center">
                    <Typography
                        variant="h3"
                        align="center"
                        color="primary"
                        sx={{ fontFamily: montserrat.style.fontFamily, flex: 1, whiteSpace: "nowrap" }}
                    >
                        {text}
                    </Typography>
                </Grid>
            </AppBar>
        </>
    );
};

export default MainBanner;