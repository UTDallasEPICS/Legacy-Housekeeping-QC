import { AppBar, CssBaseline, Grid, Typography } from "@mui/material";
import React from "react";
import { montserrat } from "../../../theme";
import { BackButton } from "../..";


interface BannerProps {
    relativePath?: string;
    function: string;
    room?: string;
    building?: string;

}

const Banner: React.FC<BannerProps> = ({ relativePath, function: functionName, room, building }) => {
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
                <BackButton pageToGoBack={relativePath} />
                <Grid item style={{ position: 'sticky', left: '50%', transform: 'translateX(-50%)' }}>
                    <Typography
                        variant="h3"
                        align="center"
                        color="primary"
                        sx={{ fontFamily: montserrat.style.fontFamily, flex: 1, whiteSpace: "nowrap" }}
                    >
                        {functionName} {room && `${room}`} {building && `${building}`}
                    </Typography>
                </Grid>
            </AppBar>
        </>
    );
};

export default Banner;