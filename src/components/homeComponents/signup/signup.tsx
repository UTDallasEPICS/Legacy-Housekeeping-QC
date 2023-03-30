import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";

const signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async () => {
    const phoneParts = phoneNumber.split(" ");

    const res = await fetch("/api/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        country_code: phoneParts[0],
        state_code: phoneParts[1],
        phone_number: phoneParts[2] + phoneParts[3],
        password,
        role,
      }),
    });
  };
  return (
    <Box
      component="form"
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="2.5rem"
    >
      <Paper elevation={3} sx={{ width: "30rem", padding: "2rem" }}>
        <h2>Sign Up</h2>

        <Stack spacing={2}>
          <TextField
            variant="outlined"
            label="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <OutlinedInput
            id="outlined-adornment-weight"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <MuiTelInput
            id="phoneNumber"
            variant="outlined"
            label="Phone Number"
            onlyCountries={["US"]}
            inputProps={{ maxLength: 15 }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e)}
          />
          <TextField
            variant="outlined"
            label="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <Button variant="outlined" onClick={() => handleSubmit()}>
            Sign Up
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default signup;
