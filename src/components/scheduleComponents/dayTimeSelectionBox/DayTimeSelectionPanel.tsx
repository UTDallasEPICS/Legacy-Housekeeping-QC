import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface SelectionBoxProps {
  day: string;
}

const SelectionBox: React.FC<SelectionBoxProps> = ({ day }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleButtonClick = (time: string) => {
    if (selectedTime === time) {
      setSelectedTime(null); // Deselect if the same button is clicked again
    } else {
      setSelectedTime(time); // Select the clicked button
    }
  };

  const isTimeSelected = (time: string) => selectedTime === time;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightgray',
      maxWidth: '12vh',
      minWidth: '12vh',
      minHeight: '20vh',
      maxHeight: '20vh',
      borderRadius: 2,
      margin: 1.5,
    }}>
      <Box sx={{
        backgroundColor: 'gray',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '13vh',
        maxWidth: '15vh',
        minHeight: '5vh',
        justifyContent: 'center',
        borderRadius: 2,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: 'lightgray',
        }}>
        <Typography sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'white',
        }}>{day}
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'lightgray',
        maxWidth: '12vh',
        minWidth: '12vh',
        minHeight: '21vh',
        maxHeight: '21vh',
        justifyContent: 'center',
        borderRadius: 2,
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          }}>
          <Button 
            onClick={() => handleButtonClick("9:00 AM")}
            sx={{  
            color: 'white',
            minWidth: '9.5vh',
            maxWidth: '9.5vh',
            height: '4vh',
            marginTop: 1,
            marginBottom: 1,
            backgroundColor: isTimeSelected("9:00 AM") ? 'red' : 'gray',
            '&:hover': {        
            backgroundColor: isTimeSelected("9:00 AM") ? 'darkred' : 'darkgray',
            }}}
          >
            9:00 AM
          </Button>
          <Button 
            onClick={() => handleButtonClick("10:30 AM")}
            sx={{
            color: 'white',
            minWidth: '9.5vh',
            maxWidth: '9.5vh',
            marginBottom: 1,
            height: '4vh',
            backgroundColor: isTimeSelected("10:30 AM") ? 'red' : 'gray',
            '&:hover': {        
            backgroundColor: isTimeSelected("10:30 AM") ? 'darkred' : 'darkgray',
            }}}
          >
            10:30 AM
          </Button>
          <Button 
            onClick={() => handleButtonClick("1:00 PM")}
            sx={{
            color: 'white',
            minWidth: '9.5vh',
            maxWidth: '9.5vh',
            height: '4vh',
            marginBottom: 1,
            backgroundColor: isTimeSelected("1:00 PM") ? 'red' : 'gray',
            '&:hover': {        
            backgroundColor: isTimeSelected("1:00 PM") ? 'darkred' : 'darkgray',
            }}}
          >
            1:00 PM
          </Button>
          <Button 
            onClick={() => handleButtonClick("2:30 PM")}
            sx={{
            color: 'white',
            minWidth: '9.5vh',
            maxWidth: '9.5vh',
            height: '4vh',
            marginBottom: 1,
            backgroundColor: isTimeSelected("2:30 PM") ? 'red' : 'gray',
            '&:hover': {        
            backgroundColor: isTimeSelected("2:30 PM") ? 'darkred' : 'darkgray',
            }}}
          >
            2:30 PM
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectionBox;
