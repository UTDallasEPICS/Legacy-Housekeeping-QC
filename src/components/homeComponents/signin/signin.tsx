import { Box, Stack } from "@mui/system";
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper elevation={3} sx={{ width: "30rem", padding: "2rem" }}>
        <h2>Sign in</h2>
        <form>
          <Stack spacing={2}>
            <TextField variant="outlined" label="email" required />
            <OutlinedInput
              id="outlined-adornment-weight"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Stack>
          <Button
            variant="outlined"
            sx={{ marginTop: "2rem", marginBottom: "1rem" }}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default signin;
