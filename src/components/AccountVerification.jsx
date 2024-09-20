import React, { useState, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "../authConfig"; // Adjust the path as needed
import { callMsGraph } from "../graphService"; // Adjust the path as needed

function AccountVerification() {
  const { instance, accounts, inProgress } = useMsal();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    if (accounts[0]) {
      getProfileData();
    }
  }, [accounts]);

  const getProfileData = async () => {
    // Check if an interaction is already in progress
    if (inProgress !== InteractionStatus.None) {
      console.log("Interaction is in progress, please try again.");
      return;
    }

    const request = {
      ...loginRequest,
      account: accounts[0]
    };

    try {
      const response = await instance.acquireTokenSilent(request);
      const data = await callMsGraph(response.accessToken);
      setGraphData(data);
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        try {
          // Prompt the user to grant consent
          await instance.acquireTokenPopup(request);
          const response = await instance.acquireTokenSilent(request);
          const data = await callMsGraph(response.accessToken);
          setGraphData(data);
        } catch (popupError) {
          console.error("Error during popup authentication:", popupError);
        }
      } else {
        console.error("Error acquiring token:", error);
      }
    }
  };

  return (
    <div>
      <h2>Account Verification</h2>
      {graphData ? (
        <div>
          <p>Account verified successfully!</p>
          <p>Name: {graphData.displayName}</p>
          <p>Email: {graphData.mail || graphData.userPrincipalName}</p>
        </div>
      ) : (
        <p>Please sign in to verify your account.</p>
      )}
    </div>
  );
}

export default AccountVerification;