/* import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowForward, Visibility, VisibilityOff } from "@mui/icons-material";
import { DashboardCardHeading } from "../..";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const signInCardInVPSize = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const message = searchParams.get("message");
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async () => {
    let route: string;
    route = "/admin/adminDashboard";

    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: `${route}`,
    });
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
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h5">Sign In</Typography>

              {message && <Alert severity="error">{message}</Alert>}
              {error && (
                <Alert severity="error">
                  {error === "CredentialsSignin"
                    ? "Invalid email or password"
                    : "An error occurred. Please try again. Error code: " +
                      error +
                      "."}
                </Alert>
              )}
              {callbackUrl && !error && (
                <Alert severity="info">
                  You must be signed in to access this page.
                </Alert>
              )}

              <a href="/api/auth/login">Login</a>

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

              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={() => handleSubmit()}
              >
                Sign in
              </Button>

              <Link href="/auths/signup">Sign up</Link>
            </Stack>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default signInCardInVPSize;
*/

import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const SignInCardInVPSize = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log("User is signed in");
      router.push("/admin/adminDashboard");
    }
  }, [user, router]);

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
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h5">Sign In</Typography>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("Signing in with Auth0");
                  signIn("auth0");
                }}
              >
                Login with Auth0
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("Current user session:", user);
                }}
              >
                Test User
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  router.push("/admin/adminDashboard");
                }}
              >
                Test Push
              </Button>
              <Link href="/auths/signup">Sign up</Link>
            </Stack>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default SignInCardInVPSize;
