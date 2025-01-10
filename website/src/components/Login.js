import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../firebase";
import { adminCheck } from "../services/showService";

const Login = () => {
  const [whitelistedEmails, setWhitelistedEmails] = useState([]);

  useEffect(() => {
    const fetchWhitelistedEmails = async () => {
      const emails = await adminCheck();
      setWhitelistedEmails(emails); // Assuming each document has an 'email' field
    };
    fetchWhitelistedEmails();
  }, []);

  const handleLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User signed in: ", user.email);
        console.log("Whitelisted emails: ", whitelistedEmails);
        if (whitelistedEmails.includes(user.email)) {
          console.log("User signed in: ", user);
        } else {
          console.error("Access denied: User is not whitelisted");
          auth.signOut(); // Sign out the user if not whitelisted
        }
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Error during sign-in: ", errorCode, errorMessage, credential);
      });
  };

return (
    <div>
        <button 
            onClick={handleLogin} 
            style={{
                backgroundColor: '#4285F4',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
            }}
        >
            Sign in with Google
        </button>
    </div>
);
};

export default Login;
