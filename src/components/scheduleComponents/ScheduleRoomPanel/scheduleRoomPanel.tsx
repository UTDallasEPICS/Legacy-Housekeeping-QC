import React from 'react';
import { Box, Button, TextField, Typography,} from '@mui/material';
import { Dropdown } from '@mui/base';
import ScheduleDisplayMember from '../scheduleWeekPanel/scheduleWeekPanel';
import SelectionBox from '../selectionBox/selectionBox';
import { green } from '@mui/material/colors';


const ScheduleRoomPanel = ( ) => {
   return(
    <Box sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "90vh",
        maxHeight: "90vh",
        backgroundColor: "lightgray",
        margin: "50px",
        boxShadow: 5,
        borderRadius: 1,
        overflowY: "auto",
         }}>

        <Box sx={{
            display: "flex", 
            flexDirection: "column",
            backgroundColor: "primary.main",
            justifyContent: "center",
            boxShadow: 4,
            minHeight: "5vh",
            borderRadius: 1,
            }}>
            <Box sx={{
                display: 'flex',
                flexDirection: "row",
                }}>
                <Typography sx={{ 
                    justifyContent: "left", 
                    color: "white", 
                    fontSize: 20, 
                    textAlign: "left",
                    fontWeight: 'bold',
                    paddingLeft: 2,
                    }}>
                    SELECTED:
                     
                </Typography>
            </Box>
        </Box>

        <SelectionBox mainLabel="SELECT BUILDING" dropDownLabel= "SELECT"/>
        <SelectionBox mainLabel="SELECT MEMBER" dropDownLabel= "SELECT"/>
        <SelectionBox mainLabel="SELECT FLOOR" dropDownLabel= "SELECT"/>
        <SelectionBox mainLabel="SELECT AREA" dropDownLabel= "SELECT"/>

        <TextField
      label="Commets:"
      variant="filled"
      sx={{
        '.MuiInputBase-root': {
          backgroundColor: 'darkgray', // Background color for the input
        },
        '.MuiInputLabel-root': {
          color: 'white',
          padding: 5, // Color of the label
        },
        '.MuiInputBase-input': {
          color: 'black', // Color of the input text
        },
        '.MuiFilledInput-underline:before': {
          borderBottomColor: 'black', // Color of the underline before focused or on hover
        },
        '.MuiFilledInput-underline:after': {
          borderBottomColor: 'gray', // Color of the underline when focused
        },
        paddingTop: 2,
        padding: 5,
        }}/>
        <Button variant="contained" color="success" sx={{
            width: "30%",
            height: "8vh",
            left: "65%",
            marginBottom: 2,
        }}>ASSIGN</Button>
    </Box>
   );
}

export default ScheduleRoomPanel;