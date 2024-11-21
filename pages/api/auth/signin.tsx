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
/*
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
*/
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { initAuth0 } from '@auth0/nextjs-auth0';

// const auth0 = initAuth0({
//     domain: process.env.AUTH0_DOMAIN,
//     clientId: process.env.AUTH0_CLIENT_ID,
//     clientSecret: process.env.AUTH0_CLIENT_SECRET,
//     scope: 'openid profile',
//     redirectUri: process.env.REDIRECT_URI,
//     postLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI,
//     session: {
//         cookieSecret: process.env.SESSION_COOKIE_SECRET,
//         cookieLifetime: 7200,
//         storeIdToken: false,
//         storeAccessToken: false,
//         storeRefreshToken: false
//     }
// });

// export default async function signin(req, res) {
//     try {
//         await auth0.handleLogin(req, res);
//     } catch (error) {
//         res.status(error.status || 400).end(error.message);
//     }
// }

const SignIn = () => {
  const { user, isLoading } = useUser(); 
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
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
              <Button variant="contained" onClick={() => withPageAuthRequired()}>
                Sign in with Auth0
              </Button>
            </Stack>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default SignIn;
