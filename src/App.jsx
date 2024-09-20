import React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import AccountVerification from "./components/AccountVerification";

function SignInButton() {
  const { instance } = useMsal();

  return (
    <button onClick={() => instance.loginPopup()}>
      Sign In
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Microsoft Graph Account Verification</h1>
      <AuthenticatedTemplate>
        <AccountVerification />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>You are not signed in! Please sign in.</p>
        <SignInButton />
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;