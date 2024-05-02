import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const ScheduleWeekPanel = () => {
  // State to store the base date for the week (starting from the current date initially)
  const [baseDate, setBaseDate] = useState(new Date());

  // Helper function to calculate the start and end dates of the week given a base date
  const getWeekDates = (date) => {
    const firstDayOfWeek = new Date(date.setDate(date.getDay() === 0 ? date.getDate() - 6 : date.getDate() - date.getDay() + 1)); // Start week on Monday
    const lastDayOfWeek = new Date(firstDayOfWeek.getTime() + (6 * 24 * 60 * 60 * 1000)); // End week on Sunday

    // Format dates as MM/DD
    const format = date => `${date.getMonth() + 1}/${date.getDate()}`;
    return `${format(firstDayOfWeek)} - ${format(lastDayOfWeek)}`;
  };

  // Calculate current week range based on baseDate
  const [weekRange, setWeekRange] = useState(getWeekDates(new Date(baseDate)));

  // Handlers to change the week when buttons are clicked
  const handlePreviousWeek = () => {
    const newBaseDate = new Date(baseDate.setDate(baseDate.getDate() - 7));
    setBaseDate(newBaseDate);
    setWeekRange(getWeekDates(new Date(newBaseDate)));
  };

  const handleNextWeek = () => {
    const newBaseDate = new Date(baseDate.setDate(baseDate.getDate() + 7));
    setBaseDate(newBaseDate);
    setWeekRange(getWeekDates(new Date(newBaseDate)));
  };

  return (
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
        <Button onClick={handlePreviousWeek} variant="contained" sx={{
            width: "5vh",
            height: "5vh",
            borderRadius: 2,
            backgroundColor: 'darkgray',
            '&:hover': {
                backgroundColor: 'lightgray',
            }
            }}>
            <KeyboardArrowLeft />
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
            sx={{ textAlign: 'center', color: "white", fontWeight: 'bold', fontSize: 20}}> 
            {weekRange}
            </Typography>
        </Box>
        <Button onClick={handleNextWeek} variant="contained" sx={{
                width: "5vh",
                height: "5vh",
                borderRadius: 2,
                backgroundColor: 'darkgray',
                '&:hover': {        
                    backgroundColor: 'lightgray',
                }
                }}>
            <KeyboardArrowRight />
        </Button>
    </Box>
  );
};

export default ScheduleWeekPanel;

