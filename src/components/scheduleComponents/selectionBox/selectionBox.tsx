import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography, SelectChangeEvent } from '@mui/material';
import { transform } from 'typescript';

interface SelectionBoxProps {
  mainLabel: string;
  dropDownLabel: string;
}

const mainBoxStyle = {
  marginLeft: 5, 
  marginRight: 5, 
  marginTop: 3
};

const innerBoxStyle = {
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: 'darkgray',
  boxShadow: 4,
  minHeight: '10vh',
  borderRadius: 1,
  overflowX: 'auto'
};

const formControlStyle = {
  minWidth: '35vh',
  maxWidth: '90%',  // restrict max width
  background: 'grey',
  borderRadius: 1,
};


const SelectionBox: React.FC<SelectionBoxProps> = ({ mainLabel, dropDownLabel }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box sx={mainBoxStyle}>
      <Box sx={innerBoxStyle}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingRight: 2,
          }}>
          <Typography
            sx={{
              p: 4,
              color: 'white',
              fontSize: 25,
              textAlign: 'left',
              fontWeight: 'bold',
            }}
          >
            {mainLabel}
          </Typography>
          <Box>
            <FormControl sx={formControlStyle}>
              {selectedValue ? null : 
                <InputLabel sx={{ 
                  color: 'lightgray',
                  left: "40%",
                  
                  }}>
                  {dropDownLabel}
                </InputLabel>
              }
              <Select 
                value={selectedValue} 
                onChange={handleSelectChange} 
                sx={{backgroundColor: "gray", color: 'white' }}>

                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectionBox;
