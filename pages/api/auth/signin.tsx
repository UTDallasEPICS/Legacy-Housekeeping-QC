/* import { SignInCardInVPSize } from "../../../src/components";

const signin = () => {
  return (
    <div>
      <SignInCardInVPSize />
    </div>
  );
};

export default function signin() {
  return <a href="/api/auth/login">Login</a>;
}

//export default signin;
*/
import { getProviders, signIn } from "next-auth/react";
import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";

import { ClientSafeProvider } from "next-auth/react";

interface SignInProps {
  providers: Record<string, ClientSafeProvider>;
}

const SignIn = ({ providers }: SignInProps) => {
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
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <Button
                    variant="contained"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </Button>
                </div>
              ))}
            </Stack>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignIn;