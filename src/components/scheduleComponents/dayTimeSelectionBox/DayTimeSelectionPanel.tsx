import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import * as console from "node:console";

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

  const generateTimeButtons = () => {
    const timez = []
    for (let i = 0;i < 24;i++){
      for (let j = 0;j < 60;j += 15){
          let js = (j === 0) ? "00":String(j)
          let time = String(i) + ":" + js
          timez.push(
              <Button
                  onClick={() => handleButtonClick(time)}
                  sx={{
                    color: 'white',
                    minWidth: '9.5vh',
                    maxWidth: '9.5vh',
                    height: '4vh',
                    marginTop: 1,
                    marginBottom: 1,
                    backgroundColor: isTimeSelected(time) ? 'red' : 'gray',
                    '&:hover': {
                      backgroundColor: isTimeSelected(time) ? 'darkred' : 'darkgray',
                    }}}
              >
                {time}
              </Button>
          )
      }
    }
    return timez
  }

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
          justifyContent: 'start',
          alignItems: 'center',
            overflow: 'auto',
          }}>
          {generateTimeButtons()}
        </Box>
      </Box>
    </Box>
  );
};

export default SelectionBox;
