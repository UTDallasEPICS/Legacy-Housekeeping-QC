import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { ArrowLeftRounded, ArrowRightAltRounded, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const ScheduleWeekPanel = () => {
  return(
    <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "primary.main",
        justifyContent: 'center',
        minHeight: "7vh",
        maxHeight: "7vh",
        minWidth: "75vh",
        maxWidth: "75vh",
        marginLeft: 8, 
        marginRight: 8, 
        marginTop: 1,
        borderRadius: 2,
        alignItems: "center",
    }}>
        <Button variant="contained" sx={{
            width: "5vh",
            height: "5vh",
            borderRadius: 2,
            backgroundColor: 'darkgray',
            '&:hover': {        
                backgroundColor: 'lightgray',
            }
            }}>
            <KeyboardArrowLeft/>
        </Button>
        <Box sx={{
            minHeight: "5vh",
            maxHeight: "5vh",
            backgroundColor: "darkgray",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: "center",
            minWidth: "30%",
            maxWidth: "30%",
            marginLeft: 2,
            marginRight: 2,
            borderRadius: 2,
            }}>
            <Typography 
            sx={{ textAlign: 'center', color: "white",fontWeight: 'bold', fontSize: 20,}}> 
            WEEK DATE
            </Typography>
        </Box>
        <Button variant="contained" sx={{
                width: "5vh",
                height: "5vh",
                borderRadius: 2,
                backgroundColor: 'darkgray',
                '&:hover': {        
                    backgroundColor: 'lightgray',
                }

                }}>
            <KeyboardArrowRight/>
        </Button>
    </Box>
  );
};

export default ScheduleWeekPanel;
