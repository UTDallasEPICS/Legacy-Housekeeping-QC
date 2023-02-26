import { Auth0Provider } from "@auth0/auth0-react";
import { LoginButton, LogoutButton } from "./components";
import "./App.css";

function App() {
  const redirectLogin = "dev-tygwcsvuarfltlc8.us.auth0.com";
  const clientID = "gWf16CFovrdZ0F0pIJ3Pa5EP1R9c3jyB";
  return (
    <Auth0Provider
      domain={redirectLogin}
      clientId={clientID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <div className="App">
        Hello World
        <LoginButton />
        <LogoutButton />
      </div>
    </Auth0Provider>
  );
}

export default App;
