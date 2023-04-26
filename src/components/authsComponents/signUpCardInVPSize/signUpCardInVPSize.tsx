import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MuiTelInput } from "mui-tel-input";
import { DashboardCardHeading } from "../..";
import Link from "next/link";
import { useState } from "react";

const signUpCardInVPSize = () => {
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
      setMessage("User created.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
    } else {
      setError("Error creating user.");
    }
  };

  return (
    <Container>
      <Box
        component="form"
        sx={{
          textAlign: "center",
          display: "flex",
          width: "1",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: { xs: 1, sm: 0.75, md: 0.5 } }}>
          <DashboardCardHeading text="LegacyQC" />

          <Box sx={{ px: 4, py: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h5">Sign Up</Typography>

              {message.length > 0 ? (
                <Alert severity="success">{message}</Alert>
              ) : error.length > 0 ? (
                <Alert severity="error">{error}</Alert>
              ) : null}

              <OutlinedInput
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <OutlinedInput
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <OutlinedInput
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <OutlinedInput
                id="outlined-adornment-weight"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end" sx={{ p: 0.5 }}>
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
                placeholder="Phone Number"
                onlyCountries={["US", "CA", "MX"]}
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

              <Button variant="contained" onClick={() => handleSubmit()}>
                Sign up
              </Button>

              <Link href="/">Sign in</Link>
            </Stack>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default signUpCardInVPSize;
