import { Box, Stack } from "@mui/system";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async () => {
    let route: string;

    if (checked) {
      route = "/user/userDashboard";
    } else {
      route = "/admin/adminDashboard";
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: `${route}`,
    });
  };

  return (
    <Box
      component="form"
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="4rem"
    >
      <Paper elevation={3} sx={{ width: "30rem", padding: "2rem" }}>
        <h2>Sign in</h2>

        <Stack spacing={2}>
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
          <Button
            variant="outlined"
            sx={{ marginTop: "2rem", marginBottom: "1rem" }}
            onClick={() => handleSubmit()}
          >
            Sign in
          </Button>
          <Link href="/auths/signup">Don't have an account? Sign Up</Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default signin;