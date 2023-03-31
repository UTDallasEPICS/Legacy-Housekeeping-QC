import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
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
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async () => {
    const phoneParts = phoneNumber.split(" ");
    let role: string;

    if (checked) {
      role = "USER";
    } else {
      role = "ADMIN";
    }

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

    if (res.ok) {
      setMessage("User Created!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
    } else {
      setError("Error creating user!");
    }
  };
  return (
    <Box
      component="form"
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="-0.5rem"
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
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Admin"
              checked={!checked}
              onChange={() => setChecked(false)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Leader"
              checked={checked}
              onChange={() => setChecked(true)}
            />
          </FormGroup>

          <Button variant="outlined" onClick={() => handleSubmit()}>
            Sign Up
          </Button>
          {message.length > 0 ? (
            <Alert severity="success">{message}</Alert>
          ) : error.length > 0 ? (
            <Alert severity="error">{error}</Alert>
          ) : null}
        </Stack>
      </Paper>
    </Box>
  );
};

export default signup;
